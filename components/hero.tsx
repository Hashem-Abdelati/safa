import Link from "next/link";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { HeroField } from "@/components/hero-field";
import { localePath, type Locale } from "@/lib/i18n";

const industries = {
  en: ["Restaurants", "Clinics", "Boutiques", "Real Estate", "Cafés", "Startups", "Personal Brands", "Luxury Services"],
  ar: ["المطاعم", "العيادات", "المتاجر", "العلامات العقارية", "المقاهي", "الشركات الناشئة", "العلامات الشخصية", "الخدمات الراقية"],
};

export function Hero({ locale }: { locale: Locale }) {
  const ar = locale === "ar";

  return (
    <section className="border-b border-ink/15">
      <HeroField className="site-container grid min-h-[calc(100svh-76px)] grid-rows-[auto_1fr_auto] py-6 md:py-8">
        <div className="flex justify-between border-b border-ink/15 pb-4 text-[10px] uppercase tracking-[0.18em] text-ink/45">
          <span>{ar ? "استوديو تصميم مواقع" : "Independent web design studio"}</span>
          <span>Amman · Worldwide</span>
        </div>

        <div className="flex items-center py-12 md:py-16">
          <div className="w-full">
            <p className="eyebrow mb-7 text-gold">{ar ? "وضوح. ذوق. حضور." : "Clarity. Taste. Presence."}</p>
            <h1 className="font-heading text-[clamp(3.25rem,8.6vw,8.8rem)] font-medium leading-[0.84] tracking-[-0.05em] text-ink">
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

        <div className="grid gap-8 border-t border-ink/15 pt-6 md:grid-cols-[1.3fr_0.7fr] md:items-end">
          <p className="max-w-2xl text-base leading-7 text-ink/68 md:text-lg md:leading-8">
            {ar
              ? "مواقع راقية للشركات التي تريد حضورًا رقميًا واضحًا، موثوقًا، ومصممًا بعناية."
              : "Premium websites for businesses that need to look as good online as they are in real life."}
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href={localePath(locale, "/contact")} className="safa-button safa-button--primary">
              {ar ? "ابدأ مشروعك" : "Start a Project"}
            </Link>
            <Link href={localePath(locale, "/services")} className="safa-button safa-button--secondary">
              {ar ? "اكتشف الخدمات" : "View Services"}
            </Link>
          </div>
        </div>
      </HeroField>
    </section>
  );
}
