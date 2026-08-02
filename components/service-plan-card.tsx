"use client";

import * as React from "react";

type ServicePlan = {
  name: string;
  fit: string;
  description: string;
  includes: string[];
  note: string;
};

export function ServicePlanCard({
  plan,
  index,
  includesLabel,
}: {
  plan: ServicePlan;
  index: number;
  includesLabel: string;
}) {
  const cardRef = React.useRef<HTMLElement>(null);
  const frameRef = React.useRef<number | null>(null);

  const updateSurface = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--surface-x", `${x}%`);
      card.style.setProperty("--surface-y", `${y}%`);
      card.style.setProperty("--surface-opacity", "1");
    });
  };

  const resetSurface = () => {
    cardRef.current?.style.setProperty("--surface-opacity", "0");
  };

  React.useEffect(
    () => () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  return (
    <article
      ref={cardRef}
      className="service-card"
      onPointerMove={updateSurface}
      onPointerLeave={resetSurface}
    >
      <div className="service-card__meta">
        <span className="service-card__number">{String(index + 1).padStart(2, "0")}</span>
        <p className="service-card__fit">{plan.fit}</p>
      </div>

      <div className="service-card__body">
        <h2 className="service-card__title">{plan.name}</h2>
        <p className="service-card__copy">{plan.description}</p>
      </div>

      <div className="service-card__scope">
        <p className="eyebrow text-ink/45">{includesLabel}</p>
        <ul className="service-card__list">
          {plan.includes.map((item) => (
            <li key={item} className="service-card__item">
              <span aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="service-card__footer">
        <p>{plan.note}</p>
        <span className="service-card__signal" aria-hidden="true" />
      </div>
    </article>
  );
}
