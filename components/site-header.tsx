"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { localePath, otherLocale, type Locale } from "@/lib/i18n";

const nav = {
  en: [
    ["Home", ""],
    ["Services", "/services"],
    ["Work", "/work"],
    ["Audit", "/audit"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ],
  ar: [
    ["الرئيسية", ""],
    ["الخدمات", "/services"],
    ["الأعمال", "/work"],
    ["فحص الموقع", "/audit"],
    ["عن صَفاء", "/about"],
    ["تواصل معنا", "/contact"],
  ],
} as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const nextLocale = otherLocale(locale);
  const localizedPath = pathname.replace(/^\/(en|ar)/, `/${nextLocale}`);

  return (
    <header className="relative z-50 border-b border-ink/12 bg-paper/95">
      <div className="site-container flex h-[76px] items-center justify-between gap-8">
        <Link
          href={localePath(locale)}
          className="group flex items-baseline gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label={locale === "ar" ? "صَفاء — الرئيسية" : "SAFA — Home"}
        >
          <span className="text-[1.15rem] font-semibold tracking-[0.22em]">SAFA</span>
          <span className="font-arabic-serif text-[1.35rem] leading-none text-olive">صَفاء</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {nav[locale].map(([label, href]) => {
            const url = localePath(locale, href);
            const active = pathname === url;
            return (
              <Link
                key={href}
                href={url}
                className={cn(
                  "nav-link text-[0.72rem] font-medium uppercase tracking-[0.13em] text-ink/65 transition-colors hover:text-ink",
                  locale === "ar" && "text-sm font-normal tracking-normal",
                  active && "text-ink",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={localizedPath}
            className="inline-flex h-9 min-w-11 items-center justify-center border border-ink/20 px-3 text-xs font-semibold tracking-[0.1em] transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={nextLocale === "ar" ? "التبديل إلى العربية" : "Switch to English"}
          >
            {nextLocale === "ar" ? "ع" : "EN"}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-10 cursor-pointer items-center justify-center border border-ink/20 transition-colors hover:bg-ink hover:text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full border-b border-ink/15 bg-paper px-6 py-5 shadow-[0_18px_40px_rgba(28,25,23,0.08)] lg:hidden"
        >
          <div className="mx-auto grid max-w-screen-2xl">
            {nav[locale].map(([label, href], index) => (
              <Link
                key={href}
                href={localePath(locale, href)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-ink/10 py-4 text-xl last:border-b-0"
              >
                <span>{label}</span>
                <span className="font-mono text-[10px] text-ink/40">0{index + 1}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
