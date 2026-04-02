# Novum Systems — Website

A modern, premium Next.js website for Novum Systems.

## Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + CSS custom properties
- **Fonts**: DM Serif Display + DM Sans (Google Fonts)
- **Deployment**: Vercel-ready

## Pages
- `/` — Homepage (Hero, Problem, Solution, Systems, Process, CTA)
- `/systems` — Systems page (FieldOps, ProjectOps, OpsCore)
- `/approach` — Approach & principles page
- `/contact` — Contact page with booking form

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Customization

### Colors
Edit CSS variables in `app/globals.css`:
- `--gold` — Primary accent color
- `--ink` — Background color
- `--ivory` — Text color

### Contact Form
The form in `app/contact/page.tsx` currently simulates submission.
Connect it to your backend, Formspree, or Resend.

### Calendly
Replace the `href="https://calendly.com"` link in the contact page
with your actual Calendly booking URL.
