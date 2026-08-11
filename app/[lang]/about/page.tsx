import { EditorialLink } from "@/components/editorial-link";
import { localePath } from "@/lib/i18n";
import { getPageLocale } from "@/lib/page-locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  return pageMetadata(locale, "about");
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  const ar = locale === "ar";
  return (
    <>
      <header className="border-b border-ink/15">
        <div className="site-container grid gap-8 py-14 md:grid-cols-[0.75fr_1.5fr_0.75fr] md:items-end md:py-18">
          <div>
            <p className="eyebrow text-gold">{ar ? "عن صَفاء" : "About SAFA"}</p>
            <p className="mt-5 font-mono text-[10px] text-ink/35">05 / 06</p>
          </div>
          <h1 className="max-w-3xl font-heading text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98]">
            {ar ? "استوديو مواقع صغير بمعيار واضح." : "A small website studio with a clear standard."}
          </h1>
          <p className="max-w-sm text-sm leading-7 text-ink/58 md:justify-self-end">
            {ar
              ? "نصمّم مواقع تبدو هادئة، موثوقة، ومبنية حول ما يحتاجه العمل فعلًا."
              : "We design websites that feel calm, credible, and built around what the business actually needs."}
          </p>
        </div>
      </header>
      <section className="page-pad">
        <div className="site-container grid gap-14 md:grid-cols-[0.75fr_1.5fr_0.75fr]">
          <div>
            <p className="font-arabic-serif text-6xl text-gold md:text-8xl">صَفاء</p>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-ink/45">Clarity · Purity · Refinement</p>
          </div>
          <div>
            <p className="font-heading text-3xl leading-[1.25] md:text-5xl">
              {ar ? "صَفاء تعني الوضوح، النقاء، والتهذيب. وهذا هو المعيار خلف كل موقع نصمّمه: بنية واضحة، عرض جميل، وحضور رقمي يبدو سهلًا ومدروسًا." : "صَفاء means clarity, purity, and refinement. That is the standard behind every website we design: clear structure, beautiful presentation, and a digital presence that feels effortless."}
            </p>
            <p className="mt-9 max-w-xl text-base leading-8 text-ink/62">
              {ar ? "نحن استوديو صغير عن قصد. هذا يعني اهتمامًا أقرب، قرارات أوضح، وعملًا لا يمر عبر طبقات من الاجتماعات. نصمّم للعلامات التي تعرف أن طريقة ظهورها جزء من جودة ما تقدّمه." : "We are a small studio by design. That means closer attention, clearer decisions, and work that does not pass through layers of meetings. We design for brands that understand how they appear is part of what they offer."}
            </p>
          </div>
          <aside className="border-s border-ink/15 ps-6 text-sm leading-7 text-ink/55">
            <p>{ar ? "استراتيجية المحتوى" : "Content structure"}</p><p>{ar ? "توجيه بصري" : "Visual direction"}</p><p>{ar ? "تصميم واجهات" : "Interface design"}</p><p>{ar ? "تطوير وإطلاق" : "Development & launch"}</p>
          </aside>
        </div>
      </section>
      <section className="border-t border-ink/15 bg-paper-deep">
        <div className="site-container grid gap-12 py-16 md:grid-cols-3 md:py-24">
          {[ar ? ["واضح", "لا نضيف شيئًا لا يخدم الفكرة."] : ["Clear", "Nothing is added unless it serves the idea."], ar ? ["مدروس", "كل تفصيلة لها سبب ومكان."] : ["Considered", "Every detail has a reason and a place."], ar ? ["صادق", "لا ندّعي ما ليس موجودًا، ولا نزيّن الغموض."] : ["Honest", "No invented claims and no decoration for uncertainty."]].map(([title, text]) => <div key={title} className="border-t border-ink/20 pt-5"><h2 className="font-heading text-4xl">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/58">{text}</p></div>)}
        </div>
      </section>
      <section className="site-container py-16 text-center md:py-24"><EditorialLink href={localePath(locale, "/contact")} isArabic={ar}>{ar ? "لنعمل معًا" : "Work with SAFA"}</EditorialLink></section>
    </>
  );
}
