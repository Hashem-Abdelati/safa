import type { Locale } from "@/lib/i18n";

export type SampleWork = {
  label: string;
  category: string;
  focus: string;
  name: string;
  description: string;
  direction: string;
  goal: string;
  challenge: string;
  outcome: string;
  proof: string[];
  features: string[];
  href: string;
  image: string;
  alt: string;
  urlLabel: string;
};

export const sampleWork: Record<Locale, SampleWork[]> = {
  en: [
    {
      label: "Private Aesthetic Clinic",
      category: "Clinic / 01",
      focus: "Informational + booking",
      name: "Aster Clinic",
      description: "A premium private clinic website with clear treatment education, doctor profiles, patient guidance, results, and booking.",
      direction: "Aesthetic clinic website",
      goal: "Make high-trust treatments feel refined, clear, and easy to explore without looking like a template.",
      challenge: "Aesthetic medical sites need to show visual proof and quality while staying clinically grounded and professional.",
      outcome: "A polished image-led clinic site with treatment paths, doctor credibility, a results portfolio, and direct booking.",
      proof: ["Results portfolio supports before-and-after style presentation", "Treatment pages explain suitability, downtime, and aftercare", "Doctor profiles and booking paths stay direct"],
      features: ["Treatment directory", "Before-and-after portfolio", "Consultation booking"],
      href: "/samples/clinic/index.html",
      image: "/sample-previews/aster-clinic-current.jpg",
      alt: "Screenshot of the Aster Clinic website homepage.",
      urlLabel: "safa.sample/clinic",
    },
    {
      label: "Restaurant Sample",
      category: "Restaurant / 02",
      focus: "Mobile-first bookings",
      name: "NOOR Restaurant",
      description: "A warm restaurant concept built mobile-first, with readable menu content, persistent booking access, events, and location details.",
      direction: "Restaurant website",
      goal: "A visual dining experience where mobile guests can read the menu, reserve, call, and find the restaurant without friction.",
      challenge: "Restaurant sites have to sell atmosphere while making the menu, hours, location, and reservation path effortless on a phone.",
      outcome: "A mobile-first hospitality site where imagery leads, practical information stays close, and guests can move quickly to booking.",
      proof: ["Menu content is native and readable without zooming", "Booking and call actions stay persistent on mobile", "Events and location details support real visits"],
      features: ["Readable menu pages", "Persistent mobile actions", "Reservation form"],
      href: "/samples/noor/index.html",
      image: "/sample-previews/noor.jpg",
      alt: "Screenshot of the NOOR Restaurant website homepage.",
      urlLabel: "safa.sample/noor",
    },
    {
      label: "Boutique Commerce Sample",
      category: "Boutique / 03",
      focus: "E-commerce flow",
      name: "Atelier Website",
      description: "A polished boutique fashion storefront with editorial direction, product browsing, cart, checkout, and style-led storytelling.",
      direction: "Boutique commerce",
      goal: "A product-led storefront with collection browsing, cart, checkout, and editorial pages.",
      challenge: "Boutique commerce needs polish without making the shopping path feel slow or confusing.",
      outcome: "An editorial storefront that keeps product discovery, cart, checkout, and brand story working together.",
      proof: ["Collections are easy to scan", "Cart and checkout are included in the flow", "Lookbook content supports brand value"],
      features: ["Product grid", "Cart and checkout", "Lookbook"],
      href: "/samples/atelier/index.html",
      image: "/sample-previews/atelier.jpg",
      alt: "Screenshot of the Atelier Website homepage.",
      urlLabel: "safa.sample/atelier",
    },
  ],
  ar: [
    {
      label: "عيادة تجميل خاصة",
      category: "عيادة / 01",
      focus: "موقع تعريفي + حجز",
      name: "Aster Clinic",
      description: "موقع مصقول لعيادة تجميل خاصة يعرض معلومات العلاج، الأطباء، إرشادات المرضى، النتائج، والحجز المباشر.",
      direction: "موقع عيادة تجميل",
      goal: "تقديم تجربة راقية وواضحة لعلاجات عالية الثقة من دون أن يبدو الموقع كقالب جاهز.",
      challenge: "مواقع طب التجميل تحتاج إلى إثبات بصري وجودة عالية مع الحفاظ على إحساس طبي مهني.",
      outcome: "موقع بصري مصقول يضم مسارات علاج واضحة، أطباء، معرض نتائج، وحجز مباشر.",
      proof: ["معرض نتائج يدعم عرض قبل وبعد", "صفحات العلاج تشرح الملاءمة وفترة التعافي والرعاية اللاحقة", "ملفات الأطباء ومسارات الحجز واضحة"],
      features: ["دليل علاجات", "معرض قبل وبعد", "حجز استشارة"],
      href: "/samples/clinic/index.html",
      image: "/sample-previews/aster-clinic-current.jpg",
      alt: "لقطة من الصفحة الرئيسية لموقع Aster Clinic.",
      urlLabel: "safa.sample/clinic",
    },
    {
      label: "نموذج مطعم",
      category: "مطعم / 02",
      focus: "حجز مخصص للهاتف",
      name: "NOOR Restaurant",
      description: "نموذج مطعم دافئ مبني للهاتف أولاً، مع قائمة سهلة القراءة، حجز دائم الوصول، مناسبات، ومعلومات موقع واضحة.",
      direction: "موقع مطعم",
      goal: "تجربة بصرية للمطعم تجعل قراءة القائمة، الحجز، الاتصال، والوصول سهلة من الهاتف.",
      challenge: "موقع المطعم يجب أن يبيع الأجواء، لكن من دون إخفاء القائمة، الأوقات، الموقع، أو الحجز على شاشة صغيرة.",
      outcome: "موقع ضيافة مخصص للهاتف حيث تقود الصور التجربة وتبقى المعلومات العملية قريبة.",
      proof: ["القائمة نصية وواضحة من دون تكبير", "أزرار الحجز والاتصال تبقى قريبة على الهاتف", "المناسبات والموقع يدعمان الزيارة الفعلية"],
      features: ["قوائم سهلة القراءة", "أزرار هاتف دائمة", "نموذج حجز"],
      href: "/samples/noor/index.html",
      image: "/sample-previews/noor.jpg",
      alt: "لقطة من الصفحة الرئيسية لنموذج موقع مطعم نور.",
      urlLabel: "safa.sample/noor",
    },
    {
      label: "نموذج متجر بوتيك",
      category: "متجر / 03",
      focus: "تجارة إلكترونية",
      name: "Atelier Website",
      description: "متجر أزياء بوتيك مصقول يجمع بين التوجيه التحريري، تصفح المنتجات، السلة، الدفع، وسرد بصري واضح.",
      direction: "موقع متجر بوتيك",
      goal: "واجهة متجر للمنتجات مع التصفح، السلة، الدفع، وصفحات تحريرية.",
      challenge: "متجر البوتيك يحتاج أناقة دون أن تصبح تجربة الشراء بطيئة أو مربكة.",
      outcome: "متجر تحريري يجعل اكتشاف المنتجات، السلة، الدفع، وقصة العلامة تعمل معًا.",
      proof: ["المجموعات سهلة التصفح", "السلة والدفع داخل المسار", "صفحات اللوك بوك ترفع قيمة العلامة"],
      features: ["شبكة منتجات", "سلة ودفع", "لوك بوك"],
      href: "/samples/atelier/index.html",
      image: "/sample-previews/atelier.jpg",
      alt: "لقطة من الصفحة الرئيسية لنموذج موقع الأتيليه.",
      urlLabel: "safa.sample/atelier",
    },
  ],
};
