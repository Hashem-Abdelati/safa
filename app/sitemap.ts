import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const localizedRoutes = ["", "/services", "/work", "/audit", "/about", "/contact", "/audiences"];

const sampleRoutes = [
  "/samples/atelier/about/index.html",
  "/samples/atelier/cart/index.html",
  "/samples/atelier/case-study/index.html",
  "/samples/atelier/checkout/index.html",
  "/samples/atelier/contact/index.html",
  "/samples/atelier/index.html",
  "/samples/atelier/lookbook/index.html",
  "/samples/atelier/new-arrivals/index.html",
  "/samples/atelier/shop/index.html",
  "/samples/atelier/style-room/index.html",
  "/samples/clinic/about/index.html",
  "/samples/clinic/book/index.html",
  "/samples/clinic/case-study/index.html",
  "/samples/clinic/contact/index.html",
  "/samples/clinic/doctors/index.html",
  "/samples/clinic/index.html",
  "/samples/clinic/patient-info/index.html",
  "/samples/clinic/portfolio/index.html",
  "/samples/clinic/services/index.html",
  "/samples/noor/about/index.html",
  "/samples/noor/case-study/index.html",
  "/samples/noor/contact/index.html",
  "/samples/noor/events/index.html",
  "/samples/noor/gallery/index.html",
  "/samples/noor/index.html",
  "/samples/noor/menu/index.html",
  "/samples/noor/reservations/index.html",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-15T00:00:00.000Z");
  const appRoutes = localizedRoutes.flatMap((route) =>
    ["en", "ar"].map((locale) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...appRoutes,
    ...sampleRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
