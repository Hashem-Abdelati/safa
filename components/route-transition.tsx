"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type Phase = "idle" | "covering" | "revealing";

export function RouteTransition({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const router = useRouter();
  const [phase, setPhase] = React.useState<Phase>("idle");
  const busyRef = React.useRef(false);
  const timersRef = React.useRef<number[]>([]);

  React.useEffect(() => {
    const timers = timersRef.current;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || busyRef.current || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith("/_next")) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      busyRef.current = true;
      setPhase("covering");

      const navigateTimer = window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);

        const revealTimer = window.setTimeout(() => {
          setPhase("revealing");
          const resetTimer = window.setTimeout(() => {
            setPhase("idle");
            busyRef.current = false;
          }, 560);
          timers.push(resetTimer);
        }, 160);
        timers.push(revealTimer);
      }, 460);

      timers.push(navigateTimer);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      timers.forEach(window.clearTimeout);
    };
  }, [router]);

  return (
    <>
      {children}
      <div className="route-curtain" data-phase={phase} aria-hidden="true">
        <div className="route-curtain__mark">
          <span>SAFA</span>
          <span className="font-arabic-serif">صَفاء</span>
        </div>
        <span className="route-curtain__status">
          {locale === "ar" ? "ننتقل بوضوح" : "Moving with clarity"}
        </span>
      </div>
    </>
  );
}
