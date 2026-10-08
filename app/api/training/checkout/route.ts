// Training day booking. Prices are computed here, never taken from the browser. The lead is
// saved first (so a booking is never lost), then the buyer goes to Stripe Checkout. With no
// STRIPE_SECRET_KEY set, this falls back to a booking request that Michael confirms and
// invoices by hand.
import { clean, notify, saveLead, type Lead } from "@/lib/leads";
import { COMPANY_TYPES, TRAINING_HOURS, trainingPrice, usd } from "@/lib/training";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const headcount = Number(body.headcount);
  const industry = clean(body.industry, 100);
  const quote = body.quote === true;
  const price = trainingPrice(headcount);
  const lead: Lead = {
    name: clean(body.name, 200),
    email: clean(body.email, 320),
    company: clean(body.company, 200),
    industry,
    tools: "",
    availability: clean(body.dates, 500),
    message: clean(body.message, 3000),
  };
  if (!lead.name || !lead.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return Response.json({ error: "Name, company, and a valid email are required." }, { status: 400 });
  }
  if (!Number.isInteger(headcount) || headcount < 1 || headcount > 100000 || !COMPANY_TYPES.includes(industry)) {
    return Response.json({ error: "Pick a company type and enter your team size." }, { status: 400 });
  }
  if (price === null && !quote) {
    return Response.json({ error: "Teams over 75 get a quote. Use the quote request." }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  const pays = price !== null && !!key;
  const kind = price === null ? "QUOTE REQUEST (76+ people)" : pays ? "BOOKING, payment started" : "BOOKING REQUEST, no payment taken";
  lead.message = `TRAINING DAY ${kind}\nTeam size: ${headcount}. Company type: ${industry}.${price !== null ? ` Price: ${usd(price)}.` : ""}\nPreferred dates: ${lead.availability || "not given"}\n\n${lead.message}`.slice(0, 5000);

  if (!(await saveLead(lead))) return Response.json({ error: "Could not save your booking." }, { status: 502 });
  await notify(lead, `Training day ${price === null ? "quote request" : pays ? "booking started" : "booking request"}: ${lead.company} (${headcount} people)`);

  if (!pays) return Response.json({ ok: true, mode: "request" });

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const form = new URLSearchParams({
    mode: "payment",
    customer_email: lead.email,
    success_url: `${origin}/training/booked`,
    cancel_url: `${origin}/training#book`,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(price! * 100),
    "line_items[0][price_data][product_data][name]": `AI training day (${TRAINING_HOURS} hours), up to ${headcount} people`,
    "metadata[company]": lead.company,
    "metadata[headcount]": String(headcount),
    "metadata[industry]": industry,
    "metadata[dates]": lead.availability.slice(0, 500),
  });
  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    const data = await res.json();
    if (!res.ok || !data.url) {
      console.error("STRIPE CHECKOUT FAILED: %s %s. Booking is saved in Supabase.", res.status, JSON.stringify(data?.error ?? data));
      return Response.json({ ok: true, mode: "request" });
    }
    return Response.json({ ok: true, mode: "pay", url: data.url });
  } catch (err) {
    console.error("STRIPE CHECKOUT FAILED: request error. Booking is saved in Supabase.", err);
    return Response.json({ ok: true, mode: "request" });
  }
}
