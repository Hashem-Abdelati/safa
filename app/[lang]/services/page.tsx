import { EditorialLink } from "@/components/editorial-link";
import { ServicePlanCard } from "@/components/service-plan-card";
import { localePath } from "@/lib/i18n";
import { getPageLocale } from "@/lib/page-locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  return pageMetadata(locale, "services");
}

const plans = {
  en: [
    {
      name: "Basic Website",
      fit: "For businesses that need a clear website and nothing extra.",
      description: "A clean, professional site that explains who you are, what you offer, and how customers can contact you.",
      includes: ["Home page and core sections", "Mobile-friendly design", "Contact details or simple form", "Launch setup"],
      note: "No ongoing maintenance included.",
    },
    {
      name: "Managed Website",
      fit: "For businesses that need updates, support, and more than a showcase.",
      description: "A stronger website with room for service pages, booking links, forms, basic content updates, and regular maintenance.",
      includes: ["Custom page structure", "Forms, bookings, or simple integrations", "Content updates after launch", "Maintenance and support"],
      note: "Best for businesses that expect the site to keep changing.",
    },
    {
      name: "Business Website Plus",
      fit: "For businesses that need selling, sign-ups, or a more complete online flow.",
      description: "A website built around a specific customer action, such as selling products, collecting leads, or guiding people through a service.",
      includes: ["E-commerce or lead flow", "Product, service, or landing pages", "Clear calls to action", "Launch support and handover"],
      note: "Scope depends on what the website needs to do.",
    },
  ],
  ar: [
    {
      name: "موقع أساسي",
      fit: "للأعمال التي تحتاج موقعًا واضحًا دون وظائف إضافية.",
      description: "موقع مهني بسيط يوضح من أنت، ماذا تقدم، وكيف يمكن للعملاء التواصل معك.",
      includes: ["الصفحة الرئيسية والأقسام الأساسية", "تصميم مناسب للجوال", "بيانات التواصل أو نموذج بسيط", "إعداد الإطلاق"],
      note: "لا يشمل صيانة مستمرة.",
    },
    {
      name: "موقع مع إدارة",
      fit: "للأعمال التي تحتاج تحديثات ودعمًا وموقعًا يتجاوز التعريف فقط.",
      description: "موقع أوسع يشمل صفحات خدمات، روابط حجز، نماذج، تحديثات محتوى بسيطة، وصيانة مستمرة.",
      includes: ["هيكل صفحات مخصص", "نماذج أو حجوزات أو ربط بسيط", "تحديثات محتوى بعد الإطلاق", "صيانة ودعم"],
      note: "مناسب إذا كان الموقع سيتغير باستمرار.",
    },
    {
      name: "موقع أعمال بلس",
      fit: "للأعمال التي تحتاج بيعًا أو تسجيلات أو مسارًا رقميًا أكثر اكتمالًا.",
      description: "موقع مبني حول إجراء واضح من العميل، مثل شراء منتج، إرسال طلب، أو متابعة خدمة.",
      includes: ["متجر أو مسار طلبات", "صفحات منتجات أو خدمات أو عروض", "دعوات واضحة لاتخاذ إجراء", "دعم الإطلاق والتسليم"],
      note: "يتم تحديد النطاق حسب ما يجب أن يفعله الموقع.",
    },
  ],
};

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getPageLocale(params);
  const ar = locale === "ar";
  return (
    <>
      <section className="section-frame surface-grid">
        <div className="site-container section-header">
          <p className="eyebrow text-ink/45">{ar ? "الخدمات" : "Services"}</p>
          <div className="section-header__row">
            <h1 className="section-heading">{ar ? "خدماتنا" : "Our Services"}</h1>
            <p className="section-lede">
              {ar
                ? "اختر مستوى الموقع حسب ما يحتاجه عملك الآن: تعريف بسيط، إدارة مستمرة، أو تجربة أوسع للبيع والطلبات."
                : "Choose the level that fits what your business needs now: a simple website, ongoing support, or a fuller online flow."}
            </p>
          </div>
        </div>
      </section>

      <section className="page-pad">
        <div className="site-container">
          <div className="service-card-grid">
            {plans[locale].map((plan, index) => (
              <ServicePlanCard
                key={plan.name}
                plan={plan}
                index={index}
                includesLabel={ar ? "يشمل" : "Includes"}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="quiet-band">
        <div className="site-container quiet-band__inner">
          <div>
            <h2 className="quiet-band__title">
              {ar ? "لست متأكدًا أي خيار يناسبك؟" : "Not sure which option fits?"}
            </h2>
            <p className="quiet-band__copy">
              {ar ? "أرسل لنا فكرة مشروعك وسنقترح النطاق الأنسب بوضوح." : "Send us what you have in mind and we will recommend the clearest scope."}
            </p>
          </div>
          <div className="md:justify-self-end"><EditorialLink href={localePath(locale, "/contact")} isArabic={ar} className="text-paper">{ar ? "ناقش مشروعك معنا" : "Discuss your project"}</EditorialLink></div>
        </div>
      </section>
    </>
  );
}
