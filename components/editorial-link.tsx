import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function EditorialLink({
  href,
  children,
  className,
  isArabic = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  isArabic?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rule-link inline-flex w-fit items-center gap-3 pb-1 text-xs font-semibold uppercase tracking-[0.14em]",
        isArabic && "text-sm font-medium tracking-normal",
        className,
      )}
    >
      {children}
      <ArrowUpRight className={isArabic ? "rotate-[-90deg]" : ""} size={15} aria-hidden="true" />
    </Link>
  );
}
