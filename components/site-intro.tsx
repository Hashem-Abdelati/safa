"use client";

import * as React from "react";
import type { Locale } from "@/lib/i18n";

type IntroPhase = "visible" | "exiting" | "hidden";

export function SiteIntro({ locale }: { locale: Locale }) {
  const [phase, setPhase] = React.useState<IntroPhase>("visible");
  const timersRef = React.useRef<number[]>([]);

  const releasePage = React.useCallback(() => {
    document.documentElement.classList.remove("intro-active");
  }, []);

  const finish = React.useCallback((quick = false) => {
    setPhase("exiting");
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      releasePage();
    }, quick ? 480 : 760);
    timersRef.current.push(hideTimer);
  }, [releasePage]);

  React.useEffect(() => {
    const timers = timersRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const skipTimer = window.setTimeout(() => {
        setPhase("hidden");
        releasePage();
      }, 0);
      timers.push(skipTimer);
      return () => timers.forEach(window.clearTimeout);
    }

    document.documentElement.classList.add("intro-active");
    const exitTimer = window.setTimeout(() => setPhase("exiting"), 1700);
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      releasePage();
    }, 2480);
    timers.push(exitTimer, hideTimer);

    return () => {
      timers.forEach(window.clearTimeout);
      document.documentElement.classList.remove("intro-active");
    };
  }, [releasePage]);

  if (phase === "hidden") return null;

  const ar = locale === "ar";

  return (
    <section
      className="site-intro"
      data-phase={phase}
      aria-label={ar ? "افتتاح موقع صَفاء" : "Opening SAFA Studio"}
      aria-live="polite"
    >
      <div className="site-intro__grid" aria-hidden="true" />
      <div className="site-intro__coordinates" aria-hidden="true">
        <span>31.9539° N</span>
        <span>35.9106° E</span>
      </div>

      <div className="site-intro__content" aria-hidden="true">
        <p className="site-intro__arabic font-arabic-serif">صَفاء</p>
        <div className="site-intro__latin" lang="en">
          {Array.from("SAFA").map((letter, index) => (
            <span key={`${letter}-${index}`} style={{ "--letter-index": index } as React.CSSProperties}>{letter}</span>
          ))}
        </div>
        <div className="site-intro__measure"><span /></div>
        <div className="site-intro__meaning">
          <span>{ar ? "وضوح" : "Clarity"}</span>
          <span>{ar ? "نقاء" : "Purity"}</span>
          <span>{ar ? "تهذيب" : "Refinement"}</span>
        </div>
      </div>

      <button type="button" className="site-intro__skip" onClick={() => finish(true)}>
        {ar ? "تخطي المقدمة" : "Skip intro"}
      </button>
      <p className="site-intro__edition" aria-hidden="true">STUDIO / 2026</p>
    </section>
  );
}
