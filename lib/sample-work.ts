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
      label: "Private Clinic Sample",
      category: "Clinic / 01",
      focus: "Informational + booking",
      name: "Clinic Sample",
      description: "A calm bilingual clinic concept built around clear services, doctors, patient information, and appointment requests.",
      direction: "Healthcare website",
      goal: "Clear service pages, doctor information, and a simple path to booking.",
      challenge: "Healthcare visitors need reassurance fast: what the clinic offers, who they will see, and how to request an appointment.",
      outcome: "A structured clinic website that feels calm, credible, and easy to act on from mobile.",
      proof: ["Service information is grouped by patient need", "Doctors and credentials are visible early", "Appointment request path is never buried"],
      features: ["Service directory", "Doctor profiles", "Booking flow"],
      href: "/samples/clinic/index.html",
      image: "/sample-previews/clinic.jpg",
      alt: "Screenshot of the Clinic Sample website homepage.",
      urlLabel: "safa.sample/clinic",
    },
    {
      label: "Restaurant Sample",
      category: "Restaurant / 02",
      focus: "Menu + reservations",
      name: "NOOR Restaurant",
      description: "A warm restaurant concept with atmosphere-led pages, native menu content, reservations, events, and location details.",
      direction: "Restaurant website",
      goal: "A visual dining experience with menus, reservations, events, and location details.",
      challenge: "Restaurant sites have to sell atmosphere while still making the menu, hours, location, and reservation path effortless.",
      outcome: "A warm hospitality site where imagery leads, practical information stays close, and guests can move quickly to booking.",
      proof: ["Menu content is native and readable", "Reservation CTA appears across key sections", "Events and location details support real visits"],
      features: ["Menu pages", "Reservation form", "Gallery and events"],
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
      label: "نموذج عيادة خاصة",
      category: "عيادة / 01",
      focus: "موقع تعريفي + حجز",
      name: "Clinic Sample",
      description: "نموذج هادئ لعيادة ثنائية اللغة يوضح الخدمات، الأطباء، معلومات المرضى، وطلبات المواعيد.",
      direction: "موقع عيادة",
      goal: "صفحات خدمات واضحة، معلومات أطباء، ومسار بسيط للحجز.",
      challenge: "زائر العيادة يحتاج طمأنينة بسرعة: ما الخدمات، من الطبيب، وكيف يطلب موعدًا.",
      outcome: "موقع عيادة منظم وهادئ يشعر بالثقة ويسهّل اتخاذ الخطوة التالية على الجوال.",
      proof: ["الخدمات مرتبة حسب حاجة المريض", "الأطباء والمؤهلات تظهر مبكرًا", "طلب الموعد واضح وغير مدفون"],
      features: ["دليل الخدمات", "ملفات الأطباء", "مسار حجز"],
      href: "/samples/clinic/index.html",
      image: "/sample-previews/clinic.jpg",
      alt: "لقطة من الصفحة الرئيسية لنموذج موقع العيادة.",
      urlLabel: "safa.sample/clinic",
    },
    {
      label: "نموذج مطعم",
      category: "مطعم / 02",
      focus: "قائمة + حجوزات",
      name: "NOOR Restaurant",
      description: "نموذج مطعم دافئ يعتمد على الأجواء، مع قائمة مباشرة، حجوزات، مناسبات، ومعلومات موقع واضحة.",
      direction: "موقع مطعم",
      goal: "تجربة بصرية للمطعم مع القائمة، الحجز، المناسبات، وتفاصيل الموقع.",
      challenge: "موقع المطعم يجب أن يبيع الأجواء، لكن من دون إخفاء القائمة، الأوقات، الموقع، أو الحجز.",
      outcome: "موقع ضيافة دافئ تقوده الصور، وتبقى المعلومات العملية قريبة وسهلة.",
      proof: ["القائمة نصية وواضحة", "دعوة الحجز موجودة في الأقسام المهمة", "المناسبات والموقع يدعمان الزيارة الفعلية"],
      features: ["صفحات القائمة", "نموذج حجز", "معرض ومناسبات"],
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
