// Contact form: store the lead in Supabase, then email a notification through Resend.
// The anon key is public by design; the leads table only allows inserts (see supabase/migrations).
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://bjmqsggbmigjmpqtcfdm.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbXFzZ2dibWlnam1wcXRjZmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzMjUwOTIsImV4cCI6MjEwNTkwMTA5Mn0.BJswIz_C16M2IFnqykNIUtR9jPFchWtclQ-28L9d9vg";

const FIELDS = ["name", "email", "company", "industry", "tools", "availability", "message"] as const;
type Lead = Record<(typeof FIELDS)[number], string>;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// A lead that reaches Supabase but not the inbox is a lead nobody answers, so every
// failure here is logged loudly. LEAD NOT EMAILED is the string to search for in the
// Vercel logs, and the lead itself is always recoverable from the Supabase leads table.
async function notify(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO;
  if (!key || !to) {
    console.error("LEAD NOT EMAILED: missing %s. Lead is saved in Supabase.", !key ? "RESEND_API_KEY" : "LEADS_TO", lead.email);
    return;
  }

  const rows = FIELDS.map((f) => `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${f}</td><td>${escape(lead[f] || "-")}</td></tr>`).join("");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Novum Website <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: lead.email,
        subject: `New lead: ${lead.company} (${lead.name})`,
        html: `<table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
      }),
    });
    if (!res.ok) {
      console.error("LEAD NOT EMAILED: Resend returned %s. Lead is saved in Supabase. %s", res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    console.error("LEAD NOT EMAILED: Resend request failed. Lead is saved in Supabase.", err);
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const lead: Lead = {
    name: clean(body.name, 200),
    email: clean(body.email, 320),
    company: clean(body.company, 200),
    industry: clean(body.industry, 100),
    tools: clean(body.tools, 2000),
    availability: clean(body.availability, 500),
    message: clean(body.message, 5000),
  };
  if (!lead.name || !lead.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return Response.json({ error: "Name, company, and a valid email are required." }, { status: 400 });
  }

  const insert = (row: object) =>
    fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });

  let res = await insert(lead);

  // The availability column arrives in a migration that may not be applied yet. Rather
  // than 502 every visitor until it is, fold the answer into the message and retry, so
  // this deploys safely in either order.
  if (!res.ok) {
    const { availability, ...rest } = lead;
    const merged = {
      ...rest,
      message: [rest.message, availability && `Free to talk: ${availability}`].filter(Boolean).join("\n\n").slice(0, 5000),
    };
    res = await insert(merged);
    if (res.ok) console.warn("leads.availability column missing; folded into message. Apply the migration.");
  }

  if (!res.ok) {
    console.error("LEAD LOST: Supabase insert failed (%s). %s", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "Could not save your message." }, { status: 502 });
  }

  await notify(lead);
  return Response.json({ ok: true });
}
