// Contact form: store the lead in Supabase, then email a notification through Resend.
import { clean, notify, saveLead, type Lead } from "@/lib/leads";

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

  // If the database is down, the email below is the only copy, so the subject says so.
  const saved = await saveLead(lead);
  const subject = `New lead: ${lead.company} (${lead.name})`;
  await notify(lead, saved ? subject : `[NOT SAVED, only copy] ${subject}`);
  return Response.json({ ok: true });
}
