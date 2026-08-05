import { WebsitePreview } from "@/components/website-preview";
import { getPageLocale } from "@/lib/page-locale";
import { sampleWork } from "@/lib/sample-work";
import { ExternalLink } from "lucide-react";

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  const ar = locale === "ar";
  const work = sampleWork[locale];
  const proofStats = ar
    ? [
        ["03", "نماذج كاملة", "عيادة، مطعم، ومتجر بوتيك."],
        ["03", "أهداف مختلفة", "تعريف، حجز، وتجربة شراء."],
        ["100%", "روابط مباشرة", "كل نموذج يفتح كموقع مستقل."],
      ]
    : [
        ["03", "Complete samples", "Clinic, restaurant, and boutique store."],
        ["03", "Different goals", "Inform, book, and sell online."],
        ["100%", "Linked previews", "Every sample opens as its own website."],
      ];

  return (
    <section className="page-pad">
      <div className="site-container">
        <div className="grid gap-8 border-b border-ink/15 pb-12 md:grid-cols-[0.8fr_1.2fr] md:items-end md:pb-16">
          <div>
            <p className="eyebrow text-gold">{ar ? "الأعمال" : "Work"}</p>
            <h1 className="mt-4 font-heading text-[clamp(2.8rem,15vw,4.6rem)] leading-none md:text-[clamp(3.5rem,7vw,5.75rem)]">
              {ar ? "نماذجنا" : "Our samples"}
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-8 text-ink/65 md:justify-self-end md:text-lg">
            {ar
              ? "ثلاثة نماذج توضح كيف يمكن لمواقع مختلفة أن تخدم أعمالًا مختلفة: عيادة، مطعم، ومتجر بوتيك."
              : "Three sample websites showing different kinds of work: a clinic, a restaurant, and a boutique store."}
          </p>
        </div>

        <div className="mt-8 grid gap-px bg-ink/15 md:grid-cols-3">
          {proofStats.map(([value, label, text]) => (
            <div key={label} className="bg-paper-deep p-6">
              <p className="font-heading text-4xl leading-none text-ink md:text-5xl">{value}</p>
              <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-ink">{label}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/58">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 divide-y divide-ink/15 border-y border-ink/15 md:mt-16">
          {work.map((project, index) => (
            <article key={project.name} className="group py-8 md:py-10">
              <div className={`grid gap-8 lg:items-center ${index % 2 === 1 ? "lg:grid-cols-[0.85fr_1.35fr]" : "lg:grid-cols-[1.35fr_0.85fr]"}`}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${ar ? "افتح نموذج" : "Open sample"} ${project.name}`}
                  className={`block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink/70 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <WebsitePreview
                    image={project.image}
                    alt={project.alt}
                    urlLabel={project.urlLabel}
                    priority={index === 0}
                    className="transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_90px_rgba(28,25,23,0.14)]"
                  />
                </a>
                <div className="flex min-h-full flex-col">
                  <div className="flex justify-between gap-5 font-mono text-[10px] uppercase text-ink/45">
                    <span>{project.category}</span>
                    <span>{project.focus}</span>
                  </div>
                  <p className="eyebrow mt-7 text-gold">{project.direction}</p>
                  <h2 className="mt-4 font-heading text-[clamp(2.7rem,13vw,4.4rem)] leading-none md:text-[clamp(3.4rem,6vw,5.75rem)]">{project.name}</h2>
                  <p className="mt-6 max-w-xl text-sm leading-7 text-ink/68 md:text-base md:leading-8">{project.description}</p>
                  <div className="mt-7 border-t border-ink/15 pt-5 text-sm leading-7 text-ink/70">
                    {project.goal}
                  </div>
                  <div className="mt-7 grid gap-px bg-ink/15 sm:grid-cols-2">
                    <div className="bg-paper p-5">
                      <p className="eyebrow text-ink/40">{ar ? "حاجة العمل" : "Business need"}</p>
                      <p className="mt-4 text-sm leading-7 text-ink/64">{project.challenge}</p>
                    </div>
                    <div className="bg-paper p-5">
                      <p className="eyebrow text-ink/40">{ar ? "ما يثبته النموذج" : "What it proves"}</p>
                      <p className="mt-4 text-sm leading-7 text-ink/64">{project.outcome}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <span key={feature} className="border border-ink/15 px-3 py-1 text-[11px] text-ink/60">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-6 grid gap-2 border-t border-ink/15 pt-5">
                    {project.proof.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-ink/62">
                        <span className="mt-2 size-1.5 shrink-0 bg-gold" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={project.href} target="_blank" rel="noreferrer" className="mt-auto inline-flex w-fit items-center gap-3 pt-8 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-gold">
                    {ar ? "افتح النموذج" : "Open sample"}
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
