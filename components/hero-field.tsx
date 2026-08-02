"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function HeroField({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const fieldRef = React.useRef<HTMLDivElement>(null);

  const updatePosition = (event: React.PointerEvent<HTMLDivElement>) => {
    const field = fieldRef.current;
    if (!field || event.pointerType === "touch") return;

    const bounds = field.getBoundingClientRect();
    field.style.setProperty("--field-x", `${event.clientX - bounds.left}px`);
    field.style.setProperty("--field-y", `${event.clientY - bounds.top}px`);
    field.style.setProperty("--field-opacity", "1");
  };

  return (
    <div
      ref={fieldRef}
      className={cn("hero-field relative", className)}
      onPointerMove={updatePosition}
      onPointerLeave={() => {
        fieldRef.current?.style.setProperty("--field-opacity", "0.25");
      }}
    >
      {children}
    </div>
  );
}
