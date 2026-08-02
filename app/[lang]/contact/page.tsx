import { ProjectForm } from "@/components/project-form";
import { contactEmail, contactPhone, contactPhoneDisplay } from "@/lib/contact";
import { getPageLocale } from "@/lib/page-locale";

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
            <h1 className="max-w-3xl font-heading text-[clamp(2.8rem,5vw,4.9rem)] leading-[0.98]">
              {ar ? "أخبرنا عن الموقع الذي تحتاجه." : "Tell us about the website you need."}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-ink/58">
              {ar ? "أرسل تفاصيل المشروع مباشرة إلى بريدنا." : "Send your project details directly to our inbox."}
            </p>
          </div>
        </div>
      </header>
      <section className="page-pad">
        <div className="site-container grid gap-16 lg:grid-cols-[0.55fr_1.45fr]">
          <aside>
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
            <div className="mt-10 grid gap-px bg-ink/15">
              {contactNotes.map(([title, text]) => (
                <div key={title} className="bg-paper p-5">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/58">{text}</p>
                </div>
              ))}
            </div>
          </aside>
          <ProjectForm locale={locale} />
        </div>
      </section>
    </>
  );
}
