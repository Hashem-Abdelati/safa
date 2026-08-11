import { ProjectForm } from "@/components/project-form";
import { contactEmail, contactPhone, contactPhoneDisplay } from "@/lib/contact";
import { getPageLocale } from "@/lib/page-locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  return pageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  const ar = locale === "ar";
  const contactNotes = ar
    ? [
        ["وقت الرد", "نرد عادة خلال يوم عمل."],
        ["خصوصية", "تفاصيل مشروعك تصل إلى بريد صَفاء فقط."],
        ["البداية", "سنقترح النطاق الأنسب قبل أي التزام."],
      ]
    : [
        ["Response time", "We usually reply within one business day."],
        ["Privacy", "Your project details go only to the SAFA inbox."],
        ["First step", "We recommend the clearest scope before any commitment."],
      ];
  return (
    <>
      <header className="border-b border-ink/15">
        <div className="site-container grid gap-8 py-14 md:grid-cols-[0.7fr_1.3fr] md:items-end md:py-18">
          <div>
            <p className="eyebrow text-gold">{ar ? "تواصل معنا" : "Contact"}</p>
            <p className="mt-5 font-mono text-[10px] text-ink/35">06 / 06</p>
          </div>
          <div>
            <h1 className="max-w-[11ch] break-words font-heading text-[clamp(2.25rem,10vw,3.4rem)] leading-[1.02] md:max-w-3xl md:text-[clamp(3.2rem,5vw,4.9rem)] md:leading-[0.98]">
              {ar ? "أخبرنا عن الموقع الذي تحتاجه." : "Tell us about the website you need."}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-ink/58">
              {ar ? "أرسل تفاصيل المشروع مباشرة إلى بريدنا." : "Send your project details directly to our inbox."}
            </p>
          </div>
        </div>
      </header>
      <section className="py-8 md:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <aside className="order-2 min-w-0 lg:order-1">
            <p className="eyebrow text-gold">{ar ? "تواصل مباشر" : "Direct contact"}</p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-ink/65">
              <a className="transition-colors hover:text-gold" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              <a className="block transition-colors hover:text-gold" href={`tel:${contactPhone}`}>
                {contactPhoneDisplay}
              </a>
              <p>Amman · Worldwide</p>
            </div>
            <div className="mt-10 grid min-w-0 gap-px bg-ink/15">
              {contactNotes.map(([title, text]) => (
                <div key={title} className="min-w-0 bg-paper p-5">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink">{title}</h2>
                  <p className="mt-3 max-w-full text-sm leading-6 text-ink/58">{text}</p>
                </div>
              ))}
            </div>
          </aside>
          <div className="order-1 lg:order-2">
            <ProjectForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
