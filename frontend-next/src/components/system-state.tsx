import type { ReactNode } from "react";

import { PageTransition } from "@/components/page-transition";

type SystemStateProps = {
  code: string;
  label: string;
  title: string;
  description: string;
  actions: ReactNode;
  suggestions?: ReactNode;
};

export function SystemState({
  code,
  label,
  title,
  description,
  actions,
  suggestions,
}: SystemStateProps) {
  return (
    <PageTransition>
      <main id="main-content" className="system-state-page page-shell">
        <section className="system-state" aria-labelledby="system-state-title">
          <p className="system-state-code" aria-hidden="true">
            {code}
          </p>
          <div className="system-state-copy">
            <p className="section-kicker">{label}</p>
            <h1 id="system-state-title">{title}</h1>
            <p>{description}</p>
            <div className="system-state-actions">{actions}</div>
          </div>
        </section>
        {suggestions ? (
          <aside className="system-state-suggestions">{suggestions}</aside>
        ) : null}
      </main>
    </PageTransition>
  );
}
