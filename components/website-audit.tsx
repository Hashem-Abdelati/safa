"use client";

import * as React from "react";
import { ArrowUpRight, Check, CircleAlert, CircleCheck, CircleX, Gauge, Info, ScanLine, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/lib/i18n";

type AuditResult = {
  url: string;
  overall: number;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    clarity: number;
  };
  categories: Array<{
    key: keyof AuditResult["scores"];
    label: string;
    weight: number;
    score: number;
    checks: Array<{
      id: string;
      label: string;
      points: number;
      maxPoints: number;
      status: "pass" | "warn" | "fail";
      detail: string;
      recommendation: string;
    }>;
  }>;
  recommendations: string[];
  auditedAt: string;
  metrics: {
    responseMs: number;
    htmlKilobytes: number;
    scripts: number;
    stylesheets: number;
    images: number;
    links: number;
    words: number;
  };
  method: string;
};

const copy = {
  en: {
    label: "Enter a public website",
    placeholder: "yourwebsite.com",
    button: "Score the site",
    loading: ["Fetching the page", "Measuring HTML signals", "Scoring the rubric", "Preparing the report"],
    note: "This is a neutral first-page audit based on public HTML and response data. It does not replace Lighthouse or a full UX review.",
    error: "We couldn’t complete the audit.",
    invalidUrl: "Please enter a valid website URL.",
    report: "Audit report",
    recommendations: "Highest-impact fixes",
    again: "Audit another site",
    labels: { clarity: "Clarity", performance: "Performance", accessibility: "Accessibility", bestPractices: "Technical", seo: "Search" },
    signals: ["Transparent scoring", "Evidence-based checks", "No sales verdict"],
    overall: "Overall score",
    measured: "Measured signals",
    rubric: "Rubric",
    points: "points",
    ctaTitle: "Want us to fix what the score found?",
    ctaText: "Send the report with your project details and we can recommend the clearest scope: small fixes, redesign, or a new build.",
    ctaButton: "Send us the report",
  },
  ar: {
    label: "أدخل رابط موقع عام",
    placeholder: "yourwebsite.com",
    button: "قيّم الموقع",
    loading: ["نجلب الصفحة", "نقيس إشارات HTML", "نحسب النقاط", "نجهّز التقرير"],
    note: "هذا فحص محايد للصفحة الأولى يعتمد على HTML العام وبيانات الاستجابة. لا يستبدل Lighthouse أو مراجعة تجربة كاملة.",
    error: "لم نتمكن من إكمال الفحص.",
    invalidUrl: "أدخل رابط موقع صالحًا.",
    report: "تقرير الفحص",
    recommendations: "أهم التحسينات",
    again: "افحص موقعًا آخر",
    labels: { clarity: "الوضوح", performance: "الأداء", accessibility: "سهولة الوصول", bestPractices: "تقني", seo: "البحث" },
    signals: ["تقييم شفاف", "فحوصات مبنية على دليل", "بدون حكم تسويقي"],
    overall: "النتيجة العامة",
    measured: "المؤشرات المقاسة",
    rubric: "معايير التقييم",
    points: "نقطة",
    ctaTitle: "هل تريد أن نصلح ما أظهرته النتيجة؟",
    ctaText: "أرسل التقرير مع تفاصيل مشروعك وسنقترح النطاق الأنسب: تحسينات بسيطة، إعادة تصميم، أو بناء جديد.",
    ctaButton: "أرسل التقرير لنا",
  },
};

function statusIcon(status: "pass" | "warn" | "fail") {
  if (status === "pass") return <CircleCheck size={15} aria-hidden="true" />;
  if (status === "warn") return <CircleAlert size={15} aria-hidden="true" />;
  return <CircleX size={15} aria-hidden="true" />;
}

function statusClass(status: "pass" | "warn" | "fail") {
  if (status === "pass") return "text-emerald-200";
  if (status === "warn") return "text-gold";
  return "text-red-200";
}

function Score({ value, label, featured = false }: { value: number; label: string; featured?: boolean }) {
  return (
    <div className={featured ? "audit-score audit-score--featured" : "audit-score"}>
      <div
        className="audit-score__ring"
        style={{ "--score": `${value * 3.6}deg` } as React.CSSProperties}
        role="img"
        aria-label={`${label}: ${value} out of 100`}
      >
        <span>{value}</span>
      </div>
      <p>{label}</p>
    </div>
  );
}

function normalizeAuditUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed || /\s/.test(trimmed)) return null;

  try {
    const target = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (!["http:", "https:"].includes(target.protocol)) return null;
    if (!target.hostname.includes(".") && !/^\d{1,3}(?:\.\d{1,3}){3}$/.test(target.hostname)) return null;
    return target.toString();
  } catch {
    return null;
  }
}

export function WebsiteAudit({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [url, setUrl] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [loadingStep, setLoadingStep] = React.useState(0);
  const [result, setResult] = React.useState<AuditResult | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (status !== "loading") return;
    const interval = window.setInterval(() => {
      setLoadingStep((step) => Math.min(step + 1, c.loading.length - 1));
    }, 5200);
    return () => window.clearInterval(interval);
  }, [status, c.loading.length]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const normalizedUrl = normalizeAuditUrl(url);
    if (!normalizedUrl) {
      setError(c.invalidUrl);
      setStatus("error");
      setResult(null);
      return;
    }

    setStatus("loading");
    setLoadingStep(0);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: normalizedUrl,
          locale,
          companyWebsite: formData.get("companyWebsite"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || c.error);
      setResult(data as AuditResult);
      setStatus("success");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : c.error);
      setStatus("error");
    }
  };

  if (status === "success" && result) {
    const metrics = [
      ["Response", `${result.metrics.responseMs}ms`],
      ["HTML", `${result.metrics.htmlKilobytes}KB`],
      ["Scripts", result.metrics.scripts],
      ["Images", result.metrics.images],
      ["Links", result.metrics.links],
      ["Words", result.metrics.words],
    ];

    return (
      <section className="audit-panel audit-results" aria-live="polite">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-paper/15 pb-7">
          <div><p className="eyebrow text-gold">{c.report}</p><p className="mt-3 max-w-xl break-all text-sm text-paper/55">{result.url}</p></div>
          <button type="button" onClick={() => setStatus("idle")} className="rule-link pb-1 text-xs uppercase tracking-[0.14em] text-paper/70">{c.again}</button>
        </div>
        <div className="grid gap-8 py-10 lg:grid-cols-[0.55fr_1.45fr]">
          <div>
            <Score value={result.overall} label={c.overall} featured />
            <div className="mt-8 grid grid-cols-2 gap-px bg-paper/15">
              {metrics.map(([label, value]) => (
                <div key={label} className="bg-ink p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/38">{label}</p>
                  <p className="mt-2 text-lg text-paper">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-px bg-paper/15">
            {result.categories.map((category) => (
              <details key={category.key} className="group bg-ink p-5" open={category.score < 90}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                  <span>
                    <span className="eyebrow text-paper/42">{category.weight}% {c.rubric}</span>
                    <span className="mt-2 block text-lg">{category.label}</span>
                  </span>
                  <span className="font-heading text-5xl leading-none text-paper">{category.score}</span>
                </summary>
                <div className="mt-5 grid gap-2">
                  {category.checks.map((check) => (
                    <div key={check.id} className="grid gap-3 border-t border-paper/10 pt-3 text-sm text-paper/62 md:grid-cols-[1fr_auto]">
                      <div>
                        <p className={`flex items-center gap-2 ${statusClass(check.status)}`}>
                          {statusIcon(check.status)}
                          <span>{check.label}</span>
                        </p>
                        <p className="mt-1 text-xs leading-5 text-paper/38">{check.detail}</p>
                      </div>
                      <p className="font-mono text-[10px] text-paper/45">{check.points}/{check.maxPoints}</p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
        <div className="border-t border-paper/15 pt-8">
          <p className="eyebrow text-paper/45">{c.recommendations}</p>
          <ol className="mt-6 grid gap-px bg-paper/15 md:grid-cols-2">
            {result.recommendations.map((item, index) => (
              <li key={item} className="flex gap-4 bg-ink p-5 text-sm leading-7 text-paper/70"><span className="font-mono text-[10px] text-gold">0{index + 1}</span><span>{item}</span></li>
            ))}
          </ol>
          <p className="mt-6 flex max-w-3xl gap-3 text-xs leading-6 text-paper/42">
            <Info size={15} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
            <span>{result.method}</span>
          </p>
          <div className="mt-8 grid gap-5 border border-paper/15 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-heading text-3xl leading-tight text-paper">{c.ctaTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-paper/55">{c.ctaText}</p>
            </div>
            <a href={localePath(locale, "/contact")} className="safa-button w-fit border-paper/70 text-paper hover:border-gold hover:text-gold">
              {c.ctaButton}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="audit-panel">
      {status === "loading" ? (
        <div className="audit-scanning" aria-live="polite" aria-busy="true">
          <div className="audit-scanning__frame"><ScanLine aria-hidden="true" /></div>
          <div>
            <p className="eyebrow text-gold">0{loadingStep + 1} / 04</p>
            <p className="mt-4 font-heading text-4xl md:text-6xl">{c.loading[loadingStep]}</p>
            <div className="mt-8 h-px overflow-hidden bg-paper/15"><div className="audit-loading-line" /></div>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={submit} className="min-w-0">
            <div className="absolute -start-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="audit-company-website">Company website</label>
              <input id="audit-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <label htmlFor="audit-url" className="eyebrow text-paper/45">{c.label}</label>
            <div className="mt-5 flex min-w-0 flex-col gap-3 md:flex-row">
              <input
                id="audit-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder={c.placeholder}
                className="h-16 min-w-0 flex-1 border border-paper/25 bg-transparent px-4 text-lg text-paper outline-none transition-colors placeholder:text-paper/25 focus:border-gold md:px-5 md:text-xl"
                required
              />
              <Button type="submit" className="h-16 w-full min-w-0 rounded-none bg-paper px-4 text-[11px] uppercase tracking-[0.12em] text-ink hover:bg-gold hover:text-ink md:w-auto md:px-7 md:text-xs md:tracking-[0.14em]">
                {c.button}<ArrowUpRight aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-4 max-w-full break-words text-xs leading-6 text-paper/40">{c.note}</p>
            {status === "error" && <p className="mt-5 border-s-2 border-gold ps-4 text-sm text-paper/70" role="alert">{error || c.error}</p>}
          </form>
          <div className="mt-8 grid gap-5 border-t border-paper/15 pt-7 md:mt-12 md:grid-cols-3 md:pt-8">
            <div className="flex items-center gap-3 text-sm text-paper/65"><Gauge size={17} className="text-gold" aria-hidden="true" />{c.signals[0]}</div>
            <div className="flex items-center gap-3 text-sm text-paper/65"><ShieldCheck size={17} className="text-gold" aria-hidden="true" />{c.signals[1]}</div>
            <div className="flex items-center gap-3 text-sm text-paper/65"><Check size={17} className="text-gold" aria-hidden="true" />{c.signals[2]}</div>
          </div>
        </>
      )}
    </section>
  );
}
