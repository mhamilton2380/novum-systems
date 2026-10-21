import Link from "next/link";
import { Brand } from "./Mark";
import { USE_CASE_NAV } from "@/lib/nav";

const COLS: { h: string; links: [string, string][] }[] = [
  { h: "AI implementation", links: [["/training", "Training"], ["/ai-implementation#agents", "Agents"], ["/ai-implementation#software", "Custom software"], ["/ai-officer", "AI Officer"]] },
  { h: "Company", links: [["/how-we-work", "How we work"], ["/case-studies", "Results"], ["/about", "About"], ["/contact", "Contact"], ["/ai-implementation/portland", "Portland"]] },
  { h: "Industries", links: [...USE_CASE_NAV.map((u): [string, string] => [`/use-cases/${u.slug}`, u.label]), ["/use-cases", "All industries"]] },
  { h: "Resources", links: [["/guides/how-to-implement-ai", "How to implement AI"], ["/guides/ai-implementation-cost", "What AI implementation costs"], ["/guides/ai-usage-policy-template", "AI usage policy starter"], ["/why-ai", "Why AI"], ["/assessment", "AI Readiness Score"]] },
  { h: "Trust", links: [["/security", "Security and data"], ["/privacy", "Privacy"], ["/terms", "Terms"]] },
];

export function NvFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="fcols">
          <div>
            <Link className="brand" href="/" aria-label="Novum AI home"><Brand /></Link>
            <p>AI implementation across your company. You own all of it.</p>
            <p><a href="mailto:hello@thenovumai.com">hello@thenovumai.com</a><br />Portland, Oregon</p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              <ul>{c.links.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="fbase"><span>© 2026 Novum AI</span><span>Hosted on SOC 2 Type 2 infrastructure</span></div>
      </div>
    </footer>
  );
}
