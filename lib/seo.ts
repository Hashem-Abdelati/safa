import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

export const siteUrl = "https://www.safaastudio.com";
export const siteName = "Safa صَفاء";
export const defaultOgImage = "/sample-previews/aster-clinic-current.jpg";

type SeoCopy = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export const seoCopy: Record<Locale, Record<string, SeoCopy>> = {
  en: {
    home: {
      title: "Safa صَفاء",
      description: "Premium websites for businesses that need to look clear, trusted, and ready online.",
      path: "/en",
    },
    about: {
      title: "About Safa",
      description: "A web design studio for businesses that care about clarity, taste, and first impressions.",
      path: "/en/about",
    },
    audiences: {
      title: "Who We Build For",
      description: "Websites for restaurants, clinics, boutiques, consultants, and service businesses.",
      path: "/en/audiences",
    },
    audit: {
      title: "Website Clarity Audit",
      description: "Score your website for performance, clarity, accessibility, and search visibility.",
      path: "/en/audit",
    },
    contact: {
      title: "Contact Safa",
      description: "Tell us about the website you need and send project details directly to the Safa inbox.",
      path: "/en/contact",
    },
    services: {
      title: "Website Services",
      description: "Clear website packages for businesses that need a simple site, maintained site, or functional web experience.",
      path: "/en/services",
    },
    work: {
      title: "Website Samples",
      description: "Explore sample websites for a clinic, restaurant, and boutique store.",
      path: "/en/work",
    },
  },
  ar: {
    home: {
      title: "صَفاء",
      description: "مواقع راقية للشركات التي تريد حضورًا رقميًا واضحًا، موثوقًا، ومصممًا بعناية.",
      path: "/ar",
    },
    about: {
      title: "عن صَفاء",
      description: "استوديو تصميم مواقع للشركات التي تهتم بالوضوح، الذوق، والانطباع الأول.",
      path: "/ar/about",
    },
    audiences: {
      title: "لمن نبني المواقع",
      description: "مواقع للمطاعم، العيادات، المتاجر، المستشارين، وشركات الخدمات.",
      path: "/ar/audiences",
    },
    audit: {
      title: "تقييم وضوح الموقع",
      description: "قيّم موقعك من حيث الأداء، الوضوح، سهولة الوصول، والظهور في البحث.",
      path: "/ar/audit",
    },
    contact: {
      title: "تواصل مع صَفاء",
      description: "أرسل تفاصيل الموقع الذي تحتاجه مباشرة إلى بريد صَفاء.",
      path: "/ar/contact",
    },
    services: {
      title: "خدمات المواقع",
      description: "باقات واضحة للشركات التي تحتاج موقعًا بسيطًا، موقعًا مع صيانة، أو تجربة رقمية وظيفية.",
      path: "/ar/services",
    },
    work: {
      title: "نماذج المواقع",
      description: "استعرض نماذج مواقع لعيادة، مطعم، ومتجر بوتيك.",
      path: "/ar/work",
    },
  },
};

export function pageMetadata(locale: Locale, page: keyof (typeof seoCopy)["en"]): Metadata {
  const copy = seoCopy[locale][page];
  const localeCode = locale === "ar" ? "ar_AR" : "en_US";
  const alternateLocale = locale === "ar" ? "en_US" : "ar_AR";
  const image = copy.image ?? defaultOgImage;
  const title = copy.title === siteName ? { absolute: siteName } : copy.title;

  return {
    title,
    description: copy.description,
    alternates: {
      canonical: copy.path,
      languages: {
        en: copy.path.replace(/^\/ar/, "/en"),
        ar: copy.path.replace(/^\/en/, "/ar"),
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: copy.path,
      siteName,
      locale: localeCode,
      alternateLocale,
      type: "website",
      images: [
        {
          url: image,
          width: 1440,
          height: 1100,
          alt: "A premium Safa website sample preview.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [image],
    },
  };
}
