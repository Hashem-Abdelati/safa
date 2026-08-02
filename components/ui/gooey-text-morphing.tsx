"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 1.35,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const filterId = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    if (texts.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      if (text1Ref.current) {
        text1Ref.current.textContent = texts[0];
        text1Ref.current.style.opacity = "100%";
      }
      return;
    }

    let animationFrameId: number;
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    const setMorph = (rawFraction: number) => {
      const fraction = Math.min(Math.max(rawFraction, 0.001), 0.999);
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        const inverse = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / inverse - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(inverse, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        morph -= cooldown;
        cooldown = 0;
        let fraction = morph / morphTime;
        if (fraction > 1) {
          cooldown = cooldownTime;
          fraction = 1;
        }
        setMorph(fraction);
      } else {
        doCooldown();
      }
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [texts, morphTime, cooldownTime]);

  return (
    <span className={cn("relative inline-grid min-h-[1.12em] min-w-[11ch] align-bottom", className)} aria-live="polite">
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <span className="relative inline-grid min-h-[1.12em] items-center" style={{ filter: `url(#${filterId})` }}>
        <span
          ref={text1Ref}
          className={cn("col-start-1 row-start-1 inline-block whitespace-nowrap", textClassName)}
        >
          {texts[0]}
        </span>
        <span
          ref={text2Ref}
          className={cn("col-start-1 row-start-1 inline-block whitespace-nowrap", textClassName)}
          aria-hidden="true"
        >
          {texts[1]}
        </span>
      </span>
    </span>
  );
}
