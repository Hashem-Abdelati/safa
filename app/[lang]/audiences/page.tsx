import { PageIntro } from "@/components/page-intro";
import { getPageLocale } from "@/lib/page-locale";

const audiences = {
  en: [
    ["Restaurants", "Atmosphere, menus, reservations, and a first impression worth visiting for."],
    ["Cafés", "A tactile digital space for the concept, location, menu, and everyday culture."],
    ["Clinics", "Quiet authority, clear services, and a booking path that builds confidence."],
    ["Boutiques", "Editorial storytelling and commerce that lets the collection take focus."],
    ["Real Estate Brands", "Properties presented with clarity, scale, and considered enquiry flows."],
    ["Startups", "A credible first home for a new idea—without looking like every other startup."],
    ["Personal Brands", "A distinct point of view organized into a professional digital presence."],
    ["Consultants", "Expertise made legible through structure, proof, and direct ways to connect."],
    ["Salons", "Services, work, and booking in an experience as polished as the space itself."],
    ["Luxury Services", "Understated digital presentation for businesses where every detail signals quality."],
  ],
  ar: [
    ["المطاعم", "أجواء وقوائم وحجوزات وانطباع أول يستحق الزيارة."],
    ["المقاهي", "مساحة رقمية ملموسة للمفهوم والموقع والقائمة والثقافة اليومية."],
    ["العيادات", "ثقة هادئة، خدمات واضحة، ومسار حجز يطمئن الزائر."],
    ["المتاجر", "سرد تحريري وتجربة شراء تترك المساحة للمجموعة أن تتحدث."],
    ["العلامات العقارية", "عقارات معروضة بوضوح وهيبة ومسارات استفسار مدروسة."],
    ["الشركات الناشئة", "منزل أول موثوق لفكرة جديدة، دون أن يشبه كل شركة ناشئة أخرى."],
    ["العلامات الشخصية", "وجهة نظر مميزة منظّمة في حضور رقمي مهني."],
    ["الاستشاريون", "خبرة واضحة من خلال البنية والدليل وطرق التواصل المباشرة."],
    ["الصالونات", "خدمات وأعمال وحجوزات بتجربة مصقولة كالمكان نفسه."],
    ["الخدمات الراقية", "عرض رقمي هادئ لأعمال تعني فيها كل تفصيلة مستوى الجودة."],
  ],
};

export default async function AudiencesPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  const ar = locale === "ar";
  return (
    <>
      <PageIntro number="02 / 06" eyebrow={ar ? "لمن نصمّم" : "Who we design for"} title={ar ? "مصمّمة لأعمال تستحق حضورًا أقوى." : "Designed for businesses with presence."} />
      <section className="page-pad">
        <div className="site-container grid gap-x-16 lg:grid-cols-2">
          {audiences[locale].map(([title, description], index) => (
            <article key={title} className="grid grid-cols-[3rem_1fr] gap-3 border-t border-ink/20 py-7 md:py-9">
              <span className="font-mono text-[10px] text-gold">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl">{title}</h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-ink/58">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
