"use client";

import * as React from "react";
import { ChevronDown, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    fields: ["Name", "Business name", "Email", "Type of website", "Tell us about the project"],
    types: ["Select one", "Brand website", "E-commerce", "Landing page", "Booking / service website", "Website redesign", "Not sure yet"],
    button: "Send Inquiry",
    whatsapp: "WhatsApp us",
    whatsappMessage: "Hi Safa, I’d like to discuss a website project for my business.",
    sending: "Sending...",
    note: "Sends directly to our inbox.",
    success: "Sent. We’ll reply soon.",
    error: "Something went wrong. Please try again or use the direct contact details.",
  },
  ar: {
    fields: ["الاسم", "اسم العمل", "البريد الإلكتروني", "نوع الموقع", "حدّثنا عن المشروع"],
    types: ["اختر النوع", "موقع علامة", "متجر إلكتروني", "صفحة هبوط", "موقع حجز / خدمات", "إعادة تصميم", "لست متأكدًا بعد"],
    button: "إرسال تفاصيل المشروع",
    whatsapp: "تواصل واتساب",
    whatsappMessage: "مرحبا صَفاء، أريد مناقشة مشروع موقع إلكتروني لعملي.",
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
          message: data.get("message"),
          website: data.get("website"),
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
      <div className="absolute -start-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="block">
        <span className="eyebrow text-ink/45">{c.fields[0]}</span>
        <input className="field" name="name" autoComplete="name" maxLength={100} required />
      </label>
      <label className="block">
        <span className="eyebrow text-ink/45">{c.fields[1]}</span>
        <input className="field" name="business" autoComplete="organization" maxLength={160} required />
      </label>
      <label className="block">
        <span className="eyebrow text-ink/45">{c.fields[2]}</span>
        <input className="field" name="email" type="email" autoComplete="email" maxLength={254} required />
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
      <label className="block md:col-span-2">
        <span className="eyebrow text-ink/45">{c.fields[4]}</span>
        <textarea className="field min-h-28 resize-y" name="message" maxLength={5000} required />
      </label>
      <div className="flex flex-col items-stretch gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="h-[3.25rem] w-full rounded-none px-6 text-xs uppercase tracking-[0.12em] sm:w-auto md:h-12"
          >
            {status === "submitting" ? c.sending : c.button}<Mail aria-hidden="true" />
          </Button>
          <a
            className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2 border border-ink/18 px-6 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-olive hover:bg-olive hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto md:h-12"
            href={whatsappHref(c.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
          >
            {c.whatsapp}<MessageCircle size={17} aria-hidden="true" />
          </a>
        </div>
        <p className="text-xs leading-6 text-ink/45 md:text-end" aria-live="polite">{statusMessage}</p>
      </div>
    </form>
  );
}
