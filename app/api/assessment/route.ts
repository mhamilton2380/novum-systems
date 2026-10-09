// AI Readiness Score: the visitor asked for the full write-up. Re-score on the server, save the lead with the
// tier, email Michael (tier in the subject), and email the visitor their write-up. No prices anywhere.
import { clean, notify, saveLead, type Lead } from "@/lib/leads";
import { AREAS, QUESTIONS, answerLabel, complete, fmt, scoreFor, tierFor, type Answers } from "@/lib/assessment";

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (clean(body.website, 200)) return Response.json({ ok: true }); // honeypot

  const answers: Answers = {};
  const raw = (body.answers ?? {}) as Record<string, unknown>;
  for (const q of QUESTIONS) if (typeof raw[q.id] === "number") answers[q.id] = raw[q.id] as number;
  if (!complete(answers)) return Response.json({ error: "The assessment isn't finished." }, { status: 400 });

  const name = clean(body.name, 200), email = clean(body.email, 320), company = clean(body.company, 200), size = clean(body.size, 50);
  if (!name || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Name, company, and a valid email are required." }, { status: 400 });
  }

  const r = scoreFor(answers);
  const tier = tierFor(answers, true, r.flags);
  const est = r.estimate.skip ? "Not enough repeat work reported for an estimate." : `${fmt(r.estimate.hoursLow)} to ${fmt(r.estimate.hoursHigh)} hours a year, $${fmt(r.estimate.dollarsLow)} to $${fmt(r.estimate.dollarsHigh)}`;
  const message = [
    `AI READINESS SCORE · ${tier.toUpperCase()}`,
    `Score ${r.score}/100 (${r.band.name}). Company size: ${size || "not given"}.`,
    `Areas: ${r.areas.map((a) => `${a.name} ${a.score}/20`).join(", ")}`,
    `Flags: ${r.flags.map((f) => f.title).join("; ") || "none"}`,
    `Estimate: ${est}`,
    "",
    ...QUESTIONS.map((q) => `${q.id}: ${answerLabel(answers, q.id)}`),
  ].join("\n").slice(0, 5000);

  const lead: Lead = { name, email, company, industry: "", tools: "", availability: "", message };
  if (!(await saveLead(lead))) return Response.json({ error: "Could not save your results." }, { status: 502 });

  const top = r.flags[0]?.title ?? r.band.name;
  await notify(lead, `AI Readiness Score [${tier}]: ${company} scored ${r.score}, top flag: ${top}`);

  // The visitor's write-up. Needs RESEND_FROM on a verified domain to reach outside addresses.
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const origin = new URL(request.url).origin;
    const bars = r.areas.map((a) => `<tr><td style="padding:6px 16px 6px 0;color:#334155">${a.name}</td><td style="padding:6px 0"><div style="width:200px;height:8px;border-radius:4px;background:#e2e8f0"><div style="width:${a.score * 10}px;height:8px;border-radius:4px;background:#00b36e"></div></div></td><td style="padding:6px 0 6px 12px;color:#0b1b2e;font-weight:700">${a.score}/20</td></tr>`).join("");
    const flags = r.flags.length
      ? r.flags.map((f) => `<h3 style="margin:24px 0 6px;font-size:16px;color:#0b1b2e">${escape(f.title)}</h3><p style="margin:0 0 6px;color:#334155">${escape(f.text)}</p><p style="margin:0;color:#64748b">${escape(f.writeup)}</p>`).join("")
      : AREAS.filter((a) => (r.areas.find((x) => x.id === a.id)?.score ?? 20) <= 10).map((a) => `<p style="color:#334155">${escape(a.headline)}</p>`).join("");
    const estHtml = r.estimate.skip
      ? `<p style="color:#334155">Your team doesn't report much repeat work. The bigger gains may be in connecting your tools or replacing one you've outgrown.</p>`
      : `<p style="color:#334155;font-size:16px"><strong>About ${fmt(r.estimate.hoursLow)} to ${fmt(r.estimate.hoursHigh)} hours a year</strong>, worth roughly $${fmt(r.estimate.dollarsLow)} to $${fmt(r.estimate.dollarsHigh)} in wages and benefits.</p><p style="color:#94a3b8;font-size:13px">Based on published studies of AI on routine office work. Your discovery measures your real number.</p>`;
    const html = `<div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0b1b2e">
      <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#067a4d;font-weight:700">Your AI Readiness Score</p>
      <h1 style="margin:0;font-size:44px">${r.score}<span style="font-size:20px;color:#94a3b8"> / 100</span></h1>
      <p style="font-size:18px;margin:6px 0 24px"><strong>${r.band.name}.</strong> ${escape(r.band.headline)}</p>
      <table style="border-collapse:collapse;font-size:14px">${bars}</table>
      <h2 style="margin:32px 0 0;font-size:20px">What's holding you back</h2>${flags}
      <h2 style="margin:32px 0 8px;font-size:20px">Hours on the table</h2>${estHtml}
      <p style="margin:32px 0"><a href="${origin}/contact" style="display:inline-block;background:#0b1b2e;color:#fff;text-decoration:none;font-weight:700;padding:14px 24px;border-radius:999px">Book a discovery call</a></p>
      <p style="color:#94a3b8;font-size:12px">Novum AI · We train your team in person, build the tools, connect your systems, and you own all of it.</p></div>`;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? "Novum AI <onboarding@resend.dev>",
          to: [email],
          reply_to: process.env.LEADS_TO?.split(",")[0]?.trim() || undefined,
          subject: `Your AI Readiness Score: ${r.score} out of 100`,
          html,
        }),
      });
      if (!res.ok) console.error("WRITE-UP NOT EMAILED: Resend returned %s for %s. %s", res.status, email, await res.text().catch(() => ""));
    } catch (err) {
      console.error("WRITE-UP NOT EMAILED: Resend request failed for %s.", email, err);
    }
  } else {
    console.error("WRITE-UP NOT EMAILED: missing RESEND_API_KEY.", email);
  }

  return Response.json({ ok: true });
}
