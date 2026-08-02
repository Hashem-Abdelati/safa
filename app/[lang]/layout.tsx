import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LocaleDocument } from "@/components/locale-document";
import { RouteTransition } from "@/components/route-transition";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteIntro } from "@/components/site-intro";
import { isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const isArabic = lang === "ar";

  return (
    <div
      lang={lang}
      dir={isArabic ? "rtl" : "ltr"}
      className={isArabic ? "font-arabic" : "font-sans"}
    >
      <LocaleDocument locale={lang} />
      <SiteIntro locale={lang} />
      <ScrollProgress />
      <a className="skip-link" href="#main-content">
        {isArabic ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <SiteHeader locale={lang} />
      <main id="main-content" className="page-enter min-h-[70vh]">
        <RouteTransition locale={lang}>{children}</RouteTransition>
      </main>
      <SiteFooter locale={lang} />
    </div>
  );
}
