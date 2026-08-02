"use client";

import * as React from "react";
import { ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    fields: ["Name", "Business name", "Email", "Type of website", "Budget range", "Tell us about the project"],
    types: ["Select one", "Brand website", "E-commerce", "Landing page", "Booking / service website", "Website redesign", "Not sure yet"],
    budgets: ["Select a range", "$2,500–$5,000", "$5,000–$10,000", "$10,000+", "Let’s discuss"],
    button: "Send Inquiry",
    sending: "Sending...",
    note: "Sends directly to our inbox.",
    success: "Sent. We’ll reply soon.",
    error: "Something went wrong. Please try again or use the direct contact details.",
  },
  ar: {
    fields: ["الاسم", "اسم العمل", "البريد الإلكتروني", "نوع الموقع", "نطاق الميزانية", "حدّثنا عن المشروع"],
    types: ["اختر النوع", "موقع علامة", "متجر إلكتروني", "صفحة هبوط", "موقع حجز / خدمات", "إعادة تصميم", "لست متأكدًا بعد"],
    budgets: ["اختر النطاق", "٢٬٥٠٠–٥٬٠٠٠ دولار", "٥٬٠٠٠–١٠٬٠٠٠ دولار", "أكثر من ١٠٬٠٠٠ دولار", "لنناقش التفاصيل"],
    button: "إرسال تفاصيل المشروع",
    sending: "جارٍ الإرسال...",
    note: "يرسل التفاصيل مباشرة إلى بريدنا.",
    success: "تم الإرسال. سنرد قريبًا.",
    error: "حدث خطأ. حاول مرة أخرى أو استخدم بيانات التواصل المباشر.",
  },
};

export function ProjectForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const c = copy[locale];
  const statusMessage = status === "success" ? c.success : status === "error" ? c.error : c.note;

  return (
    <form
      className="grid gap-x-8 gap-y-8 md:grid-cols-2"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const payload = {
          name: data.get("name"),
          business: data.get("business"),
          email: data.get("email"),
          websiteType: data.get("websiteType"),
          budget: data.get("budget"),
          message: data.get("message"),
        };

        setStatus("submitting");

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) throw new Error("Contact form failed");

          form.reset();
          setStatus("success");
        } catch {
          setStatus("error");
        }
      }}
    >
      <label className="block">
        <span className="eyebrow text-ink/45">{c.fields[0]}</span>
        <input className="field" name="name" autoComplete="name" required />
      </label>
      <label className="block">
        <span className="eyebrow text-ink/45">{c.fields[1]}</span>
        <input className="field" name="business" autoComplete="organization" required />
      </label>
      <label className="block">
        <span className="eyebrow text-ink/45">{c.fields[2]}</span>
        <input className="field" name="email" type="email" autoComplete="email" required />
      </label>
      <label className="block">
        <span className="eyebrow text-ink/45">{c.fields[3]}</span>
        <div className="relative mt-2">
          <select className="select-field" name="websiteType" defaultValue="" required>
            {c.types.map((option, index) => <option key={option} value={index === 0 ? "" : option}>{option}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gold" size={17} aria-hidden="true" />
        </div>
      </label>
      <label className="block">
        <span className="eyebrow text-ink/45">{c.fields[4]}</span>
        <div className="relative mt-2">
          <select className="select-field" name="budget" defaultValue="" required>
            {c.budgets.map((option, index) => <option key={option} value={index === 0 ? "" : option}>{option}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gold" size={17} aria-hidden="true" />
        </div>
      </label>
      <label className="block md:col-span-2">
        <span className="eyebrow text-ink/45">{c.fields[5]}</span>
        <textarea className="field min-h-28 resize-y" name="message" required />
      </label>
      <div className="flex flex-col items-start gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 rounded-none px-6 text-xs uppercase tracking-[0.12em]"
        >
          {status === "submitting" ? c.sending : c.button}<Mail aria-hidden="true" />
        </Button>
        <p className="text-xs text-ink/45" aria-live="polite">{statusMessage}</p>
      </div>
    </form>
  );
}
