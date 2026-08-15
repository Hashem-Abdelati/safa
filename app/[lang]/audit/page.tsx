import { WebsiteAudit } from "@/components/website-audit";
import { EditorialLink } from "@/components/editorial-link";
import { localePath } from "@/lib/i18n";
import { getPageLocale } from "@/lib/page-locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  return pageMetadata(locale, "audit");
}

export default async function AuditPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  const ar = locale === "ar";

  return (
    <>
      <section className="bg-ink pt-9 text-paper md:pt-24">
        <div className="site-container grid gap-5 border-b border-paper/15 pb-7 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-8 md:pb-10">
          <div>
            <p className="eyebrow text-gold">{ar ? "فحص الموقع" : "Website audit"}</p>
            <h1 className="mt-3 max-w-[9ch] break-words font-heading text-[clamp(2.25rem,11vw,3.4rem)] leading-none md:mt-4 md:max-w-none md:text-[clamp(3rem,7vw,5.75rem)]">
              {ar ? "نتيجة واضحة." : "A clear score."}
            </h1>
          </div>
          <p className="max-w-2xl break-words text-sm leading-7 text-paper/62 md:justify-self-end md:text-lg md:leading-8">
            {ar
              ? "أدخل رابطًا عامًا لنفحص الصفحة الأولى بنقاط موضوعية: الأداء، الوصول، البحث، الأساس التقني، ووضوح التجربة."
              : "Enter a public website and get an objective first-page score for performance, accessibility, search, technical foundation, and clarity."}
          </p>
        </div>
      </section>
      <section className="bg-ink py-6 text-paper md:py-16">
        <div className="site-container">
          <WebsiteAudit locale={locale} />
        </div>
      </section>
      <section className="page-pad">
        <div className="site-container grid gap-12 md:grid-cols-[0.8fr_2fr]">
          <div><p className="eyebrow text-ink/45">{ar ? "طريقة التقييم" : "Scoring method"}</p><p className="mt-5 font-mono text-[10px] text-ink/35">100 POINTS</p></div>
          <div className="grid gap-px bg-ink/15 sm:grid-cols-2">
            {[
              ar ? ["الأداء", "زمن الاستجابة، حجم HTML، عدد السكربتات، ملفات التنسيق، وتحميل الصور."] : ["Performance", "Response time, HTML weight, scripts, stylesheets, and image loading."],
              ar ? ["سهولة الوصول", "لغة الصفحة، المعالم الدلالية، نصوص الصور، وعناوين الحقول."] : ["Accessibility", "Page language, landmarks, image alt text, and form labels."],
              ar ? ["الظهور في البحث", "العنوان، الوصف، H1، الرابط الأساسي، ومعاينة المشاركة."] : ["Search visibility", "Title, description, H1, canonical URL, and social preview metadata."],
              ar ? ["الأساس التقني", "HTTPS، الترميز، viewport، المحتوى المختلط، وأحداث JavaScript داخل HTML."] : ["Technical foundation", "HTTPS, charset, viewport, mixed content, and inline JavaScript handlers."],
              ar ? ["وضوح التجربة", "رسالة الصفحة، عمق المحتوى، خيارات التنقل، واتساق العنوان والوصف."] : ["Experience clarity", "Primary message, content depth, navigation paths, and metadata consistency."],
            ].map(([title, text], index) => (
              <article key={title} className={`bg-paper p-7 md:p-9 ${index === 4 ? "sm:col-span-2" : ""}`}>
                <span className="font-mono text-[10px] text-gold">0{index + 1}</span>
                <h2 className="mt-8 font-heading text-4xl">{title}</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-ink/58">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-ink/15 bg-paper-deep">
        <div className="site-container grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-18">
          <div>
            <p className="eyebrow text-ink/45">{ar ? "بعد الفحص" : "After the score"}</p>
            <h2 className="mt-5 max-w-3xl font-heading text-4xl leading-tight md:text-6xl">
              {ar ? "إذا ظهرت المشكلة بوضوح، يصبح إصلاحها أسهل." : "Once the problem is visible, the fix gets clearer."}
            </h2>
          </div>
          <EditorialLink href={localePath(locale, "/contact")} isArabic={ar}>
            {ar ? "اطلب مراجعة أعمق" : "Request a deeper review"}
          </EditorialLink>
        </div>
      </section>
    </>
  );
}
