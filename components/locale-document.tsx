"use client";

import * as React from "react";
import type { Locale } from "@/lib/i18n";

export function LocaleDocument({ locale }: { locale: Locale }) {
  React.useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
