// Contact form: store the lead in Supabase, then email a notification through Resend.
import { clean, notify, saveLead, type Lead } from "@/lib/leads";

const PLAN_NAMES: Record<string, string> = { growth: "Growth", pro: "Pro" };

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
  const plan = PLAN_NAMES[clean(body.plan, 20)];
  if (plan) lead.message = `AI OFFICER START: ${plan}, wants a discovery quote. 6-month minimum.\n\n${lead.message}`.slice(0, 5000);
  if (!lead.name || !lead.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return Response.json({ error: "Name, company, and a valid email are required." }, { status: 400 });
  }

  if (!(await saveLead(lead))) {
    return Response.json({ error: "Could not save your message." }, { status: 502 });
  }

  await notify(
    lead,
    plan ? `AI Officer sign-up, discovery requested, ${plan}: ${lead.company} (${lead.name})` : `New lead: ${lead.company} (${lead.name})`,
  );
  return Response.json({ ok: true });
}
