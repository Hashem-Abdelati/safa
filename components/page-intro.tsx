import { cn } from "@/lib/utils";

export function PageIntro({
  number,
  eyebrow,
  title,
  description,
  dark = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <header className={cn("border-b", dark ? "border-paper/15 bg-ink text-paper" : "border-ink/15")}>
      <div className="site-container grid gap-10 py-16 md:grid-cols-[1fr_2.3fr] md:py-24">
        <div className="flex items-start justify-between md:block">
          <p className={cn("eyebrow", dark ? "text-paper/50" : "text-ink/45")}>{eyebrow}</p>
          <span className={cn("font-mono text-[10px] md:mt-24 md:block", dark ? "text-paper/35" : "text-ink/35")}>{number}</span>
        </div>
        <div>
          <h1 className="display-title max-w-5xl">{title}</h1>
          {description && (
            <p className={cn("mt-8 max-w-2xl text-base leading-8 md:text-lg", dark ? "text-paper/60" : "text-ink/60")}>
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
