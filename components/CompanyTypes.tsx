"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/PageVisuals";

// Training: the same five hours, built from each company's own work. Cycles on its own; click a tab to stop it.
const TYPES: { id: string; name: string; icon: IconName; tasks: string[]; agent: string }[] = [
  {
    id: "law",
    name: "Law firm",
    icon: "legal",
    tasks: ["Summarize a 40-page lease into the terms that matter", "Draft a client status letter from the matter notes", "Pull every deadline out of a scheduling order"],
    agent: "Intake agent: new matter emails turned into a conflict check",
  },
  {
    id: "roofing",
    name: "Roofing contractor",
    icon: "construction",
    tasks: ["Turn a site-walk voice memo into an estimate scope", "Write a homeowner update from the crew's photos", "Compare three supplier quotes line by line"],
    agent: "Estimate agent: inspection notes drafted into a proposal",
  },
  {
    id: "accounting",
    name: "Accounting firm",
    icon: "accounting",
    tasks: ["Write the missing-documents email for every client at once", "Summarize a new client's prior-year return", "Build a month-end checklist from last year's notes"],
    agent: "Document chase agent: follows up until the file is complete",
  },
  {
    id: "field",
    name: "Field service company",
    icon: "field-services",
    tasks: ["Write a job summary from a technician's notes", "Answer \"where's my tech?\" from the dispatch board", "Turn a service history into a maintenance proposal"],
    agent: "Dispatch update agent: customers told when the tech is running late",
  },
];

export function CompanyTypes() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % TYPES.length), 5200);
    return () => clearInterval(id);
  }, [auto]);
  const t = TYPES[i];
  return (
    <div className="pv-types">
      <div className="pv-types-tabs" role="tablist" aria-label="Company type">
        {TYPES.map((x, k) => (
          <button key={x.id} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => { setI(k); setAuto(false); }}>
            <Icon name={x.icon} size={18} />
            {x.name}
            {k === i && auto && <i className="pv-types-prog" />}
          </button>
        ))}
      </div>
      <div className="pv-types-body" key={t.id}>
        <div className="pv-label">Your team practices on</div>
        <ul>
          {t.tasks.map((task, k) => (
            <li key={task} style={{ ["--i" as string]: k }}><b aria-hidden="true">✓</b>{task}</li>
          ))}
        </ul>
        <div className="pv-types-agent" style={{ ["--i" as string]: 3 }}>
          <span className="oc-role-icon"><Icon name="bot" size={18} /></span>
          <div><small>First agent worth building</small><strong>{t.agent}</strong></div>
        </div>
      </div>
    </div>
  );
}
