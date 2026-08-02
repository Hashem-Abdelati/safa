import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactEmail, contactPhone, contactPhoneDisplay } from "@/lib/contact";
import { localePath, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <footer className="border-t border-paper/15 bg-ink text-paper">
      <div className="site-container grid gap-14 py-14 md:grid-cols-[1.3fr_0.7fr] md:py-20">
        <div>
          <p className="eyebrow text-paper/45">{ar ? "وضوح في كل تفصيلة" : "Clarity in every detail"}</p>
          <p className="mt-5 max-w-xl font-heading text-4xl leading-[1.05] md:text-6xl">
            {ar ? "حضور رقمي يليق بعملك." : "A digital presence worthy of your work."}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-10 md:items-end">
          <Link
            href={localePath(locale, "/contact")}
            className="inline-flex w-fit items-center gap-3 border-b border-gold pb-2 text-sm transition-colors hover:text-gold"
          >
            {ar ? "ابدأ مشروعك" : "Start a project"}
            <ArrowUpRight className={ar ? "rotate-[-90deg]" : ""} size={16} aria-hidden="true" />
          </Link>
          <div className="text-sm leading-7 text-paper/55 md:text-end">
            <p>Amman · Dubai · Worldwide</p>
            <a className="transition-colors hover:text-gold" href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <a className="block transition-colors hover:text-gold" href={`tel:${contactPhone}`}>{contactPhoneDisplay}</a>
            <p className="mt-2 text-xs">© {new Date().getFullYear()} SAFA صَفاء</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
