import { Hero } from "@/components/hero";
import { EditorialLink } from "@/components/editorial-link";
import { WebsitePreview } from "@/components/website-preview";
import { getPageLocale } from "@/lib/page-locale";
import { localePath } from "@/lib/i18n";
import { sampleWork } from "@/lib/sample-work";
import { ExternalLink } from "lucide-react";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  const ar = locale === "ar";
  const selectedSamples = sampleWork[locale];
  const trustPoints = ar
    ? [
        ["01", "نطاق واضح", "تعرف ما الذي سيتم بناؤه قبل بدء العمل."],
        ["02", "تصميم حسب الهدف", "كل صفحة تخدم خطوة فعلية للعميل."],
        ["03", "جاهز للإطلاق", "موقع سريع، متجاوب، ومجهز للتواصل."],
        ["04", "ثنائي اللغة عند الحاجة", "إنجليزي وعربي بنفس العناية البصرية."],
      ]
    : [
        ["01", "Clear scope", "You know what is being built before work begins."],
        ["02", "Goal-led design", "Every page supports a real customer action."],
        ["03", "Launch ready", "Responsive, fast, and ready for inquiries."],
        ["04", "Bilingual when needed", "English and Arabic handled with equal care."],
      ];

  return (
    <>
      <Hero locale={locale} />

      <section className="page-pad">
        <div className="site-container grid gap-12 md:grid-cols-[0.75fr_2fr]">
          <div>
            <p className="eyebrow text-ink/45">{ar ? "لماذا صَفاء" : "The premise"}</p>
            <p className="mt-5 font-mono text-[10px] text-ink/35">01 / 03</p>
          </div>
          <div>
            <h2 className="max-w-[12ch] break-words font-heading text-[clamp(2.35rem,10vw,3.65rem)] font-medium leading-[1.02] tracking-[-0.02em] md:max-w-5xl md:text-[clamp(3.4rem,5.5vw,5.8rem)] md:leading-[0.98] md:tracking-[-0.035em]">
              {ar ? "موقعك ليس مجرد واجهة. إنه أول دليل على جودة عملك." : "Your website is not decoration. It is the first proof of your business."}
            </h2>
            <div className="mt-10 grid gap-8 border-t border-ink/15 pt-7 md:grid-cols-2">
              <p className="max-w-xl text-base leading-8 text-ink/65">
                {ar
                  ? "تصمّم صَفاء مواقع للعلامات التي تهتم بالذوق، الثقة، والانطباع الأول. من المواقع التعريفية البسيطة إلى تجارب التجارة الإلكترونية المتكاملة، نصنع حضورًا رقميًا واضحًا، مدروسًا، ومتناسقًا مع هوية عملك."
                  : "SAFA designs websites for brands that care about taste, trust, and first impressions. From simple business websites to full e-commerce experiences, we build digital spaces that feel clear, intentional, and aligned with your brand."}
              </p>
              <div className="flex items-end md:justify-end">
                <EditorialLink href={localePath(locale, "/about")} isArabic={ar}>
                  {ar ? "عن صَفاء" : "About the studio"}
                </EditorialLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/15 bg-paper-deep">
        <div className="site-container grid gap-px bg-ink/15 md:grid-cols-4">
          {trustPoints.map(([number, title, text]) => (
            <article key={title} className="bg-paper-deep px-6 py-8 md:px-8 md:py-10">
              <p className="font-mono text-[10px] text-gold">{number}</p>
              <h2 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink/58">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="audit-teaser border-y border-paper/15 bg-ink text-paper">
        <div className="site-container grid min-h-[460px] gap-12 py-16 md:grid-cols-[1fr_0.9fr] md:items-center md:py-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="size-1.5 animate-pulse rounded-full bg-gold" />
              <p className="eyebrow text-paper/45">{ar ? "مختبر صَفاء / أداة مباشرة" : "SAFA studio lab / Live tool"}</p>
            </div>
            <h2 className="mt-7 max-w-[12ch] break-words font-heading text-[clamp(2.45rem,11vw,3.7rem)] leading-[1] md:max-w-3xl md:text-[clamp(3.5rem,5.5vw,6rem)] md:leading-[0.94]">
              {ar ? "الجمال مهم. لكن هل يعمل موقعك فعلًا؟" : "Looking good matters. Working well matters more."}
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-paper/55 md:text-base">
              {ar ? "افحص أداء موقعك، وضوحه، سهولة الوصول إليه، وظهوره في البحث من خلال بيانات حقيقية." : "Audit your website’s performance, clarity, accessibility, and search visibility with real data."}
            </p>
            <EditorialLink href={localePath(locale, "/audit")} isArabic={ar} className="mt-9 text-paper">
              {ar ? "افحص موقعك الآن" : "Run a free clarity audit"}
            </EditorialLink>
          </div>
          <div className="audit-orbit" aria-hidden="true">
            <div className="audit-orbit__ring audit-orbit__ring--one" />
            <div className="audit-orbit__ring audit-orbit__ring--two" />
            <div className="audit-orbit__ring audit-orbit__ring--three" />
            <div className="audit-orbit__score"><span>92</span><small>{ar ? "وضوح" : "clarity"}</small></div>
            <span className="audit-orbit__signal audit-orbit__signal--one">PERF 88</span>
            <span className="audit-orbit__signal audit-orbit__signal--two">A11Y 96</span>
            <span className="audit-orbit__signal audit-orbit__signal--three">SEO 91</span>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/15 bg-paper-deep">
        <div className="site-container grid md:grid-cols-[0.8fr_2.2fr]">
          <div className="border-b border-ink/15 py-10 md:border-b-0 md:border-e md:py-16 md:pe-10">
            <p className="eyebrow text-ink/45">{ar ? "مختارات الخدمات" : "Selected services"}</p>
            <p className="mt-5 font-mono text-[10px] text-ink/35">02 / 03</p>
          </div>
          <div className="divide-y divide-ink/15 md:ps-12">
            {[
              ar ? "تصميم مواقع العلامات" : "Brand website design",
              ar ? "متاجر إلكترونية" : "E-commerce experiences",
              ar ? "إعادة تصميم المواقع" : "Website redesigns",
            ].map((item, index) => (
              <div key={item} className="group flex items-baseline justify-between gap-6 py-7 md:py-10">
                <h3 className="font-heading text-3xl transition-[padding] duration-200 group-hover:ps-2 md:text-5xl">{item}</h3>
                <span className="font-mono text-[10px] text-ink/35">0{index + 1}</span>
              </div>
            ))}
            <div className="py-8">
              <EditorialLink href={localePath(locale, "/services")} isArabic={ar}>
                {ar ? "جميع الخدمات" : "Explore all services"}
              </EditorialLink>
            </div>
          </div>
        </div>
      </section>

      <section id="samples" className="page-pad">
        <div className="site-container">
          <div className="mb-10 grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow text-ink/45">{ar ? "نماذج المواقع" : "Website samples"}</p>
              <h2 className="mt-4 font-heading text-[clamp(2.4rem,11vw,3.6rem)] leading-none md:text-6xl">{ar ? "نماذج حقيقية لثلاثة أنواع من المواقع." : "Three real sample websites."}</h2>
            </div>
            <div className="md:text-end">
              <span className="font-mono text-[10px] text-ink/35">03 / 03</span>
              <p className="mt-3 max-w-md text-sm leading-6 text-ink/55 md:ms-auto">
                {ar
                  ? "نستعرض عيادة، مطعم، ومتجر أزياء حتى ترى كيف يتغير التصميم حسب هدف العمل."
                  : "A clinic, a restaurant, and a boutique shop showing how the design changes around each business goal."}
              </p>
            </div>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {selectedSamples.map((sample, index) => (
              <a
                key={sample.href}
                href={sample.href}
                target="_blank"
                rel="noreferrer"
                className="group block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink/70"
              >
                <article className="flex h-full flex-col">
                  <WebsitePreview image={sample.image} alt={sample.alt} urlLabel={sample.urlLabel} priority={index === 0} />
                  <div className="mt-5 flex flex-1 flex-col border-t border-ink/15 pt-5">
                    <div className="flex justify-between gap-4 font-mono text-[10px] uppercase text-ink/45">
                      <span>{sample.category}</span>
                      <span className="text-end">{sample.focus}</span>
                    </div>
                    <h3 className="mt-5 font-heading text-[clamp(2.25rem,10vw,2.8rem)] leading-none md:text-4xl">{sample.name}</h3>
                    <p className="mt-4 text-sm leading-6 text-ink/62">{sample.description}</p>
                    <p className="mt-4 border-s border-gold ps-4 text-sm leading-6 text-ink/62">{sample.outcome}</p>
                    <span className="mt-auto inline-flex w-fit items-center gap-2 pt-6 font-mono text-[10px] uppercase text-ink transition-colors duration-200 group-hover:text-gold">
                      {ar ? "افتح النموذج" : "Open sample"}
                      <ExternalLink size={13} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              </a>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <EditorialLink href={localePath(locale, "/work")} isArabic={ar}>{ar ? "شاهد جميع النماذج" : "View all sample work"}</EditorialLink>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15 bg-sand">
        <div className="site-container flex min-h-[52vh] flex-col items-center justify-center py-20 text-center">
          <p className="eyebrow text-ink/50">{ar ? "مشروعك يبدأ من هنا" : "Your project starts here"}</p>
          <h2 className="mt-7 max-w-[12ch] break-words font-heading text-[clamp(2.55rem,12vw,4rem)] leading-[0.98] tracking-[-0.02em] md:max-w-5xl md:text-[clamp(3.4rem,7vw,7rem)] md:leading-[0.92] md:tracking-[-0.035em]">
            {ar ? "ليبدو عملك واضحًا، موثوقًا، وجاهزًا." : "Make your business feel clear, trusted, and ready."}
          </h2>
          <EditorialLink href={localePath(locale, "/contact")} isArabic={ar} className="mt-9">{ar ? "ابدأ مشروعك" : "Start a project"}</EditorialLink>
        </div>
      </section>
    </>
  );
}
