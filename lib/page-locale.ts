import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";

export async function getPageLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
