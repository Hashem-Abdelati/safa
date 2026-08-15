import Link from "next/link";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { HeroField } from "@/components/hero-field";
import { localePath, type Locale } from "@/lib/i18n";

const industries = {
  en: ["Businesses", "Clinics", "Boutiques", "Restaurants", "Cafés", "Startups", "Brands", "Studios"],
  ar: ["الأعمال", "العيادات", "المتاجر", "المطاعم", "المقاهي", "الشركات", "العلامات", "الاستوديوهات"],
};

export function Hero({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const proof = ar
    ? ["متجاوب", "جاهز للتواصل", "ثنائي اللغة"]
    : ["Responsive", "Inquiry-ready", "Bilingual-ready"];

  return (
    <section className="border-b border-ink/15">
      <HeroField className="site-container grid min-h-[calc(86svh-64px)] grid-rows-[auto_auto_auto] py-4 md:min-h-[calc(100svh-76px)] md:grid-rows-[auto_1fr_auto] md:py-8">
        <div className="flex justify-between gap-4 border-b border-ink/15 pb-3 text-[9px] uppercase tracking-[0.16em] text-ink/45 md:pb-4 md:text-[10px] md:tracking-[0.18em]">
          <span>{ar ? "استوديو تصميم مواقع" : "Independent web design studio"}</span>
          <span className="hidden shrink-0 sm:inline">Amman · Worldwide</span>
        </div>

        <div className="flex items-center py-7 sm:py-9 md:py-16">
          <div className="w-full">
            <p className="eyebrow mb-3 text-gold md:mb-7">{ar ? "وضوح. ذوق. حضور." : "Clarity. Taste. Presence."}</p>
            <h1 className="max-w-[11ch] break-words font-heading text-[clamp(2.85rem,12vw,4.45rem)] font-medium leading-[0.92] tracking-normal text-ink md:max-w-none md:text-[clamp(4.5rem,8.6vw,8.8rem)] md:leading-[0.84]">
              <span className="block">{ar ? "نصمّم مواقع لـ" : "We Design Websites for"}</span>
              <GooeyText
                texts={industries[locale]}
                morphTime={0.72}
                cooldownTime={0.48}
                className="mt-2 text-olive"
                textClassName="font-heading"
              />
            </h1>
          </div>
        </div>

        <div className="grid gap-4 border-t border-ink/15 pt-4 md:grid-cols-[1.3fr_0.7fr] md:items-end md:gap-8 md:pt-6">
          <div>
            <p className="max-w-[20rem] text-[0.95rem] leading-7 text-ink/68 sm:max-w-[34rem] md:max-w-2xl md:text-lg md:leading-8">
              {ar
                ? "مواقع راقية للشركات التي تريد حضورًا رقميًا واضحًا، موثوقًا، ومصممًا بعناية."
                : "Premium websites for businesses that need to look as good online as they are in real life."}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
              {proof.map((item) => (
                <span key={item} className="border border-ink/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/48">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:flex sm:flex-wrap md:justify-end">
            <Link href={localePath(locale, "/contact")} prefetch={false} className="safa-button safa-button--primary">
              {ar ? "ابدأ مشروعك" : "Start a Project"}
            </Link>
            <Link href={localePath(locale, "/services")} prefetch={false} className="safa-button safa-button--secondary">
              {ar ? "اكتشف الخدمات" : "View Services"}
            </Link>
          </div>
        </div>
      </HeroField>
    </section>
  );
}
