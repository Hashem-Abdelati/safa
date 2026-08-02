import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_HTML_BYTES = 2_500_000;
const MAX_REDIRECTS = 4;

function isPrivateAddress(address: string) {
  const ip = address.replace(/^::ffff:/, "").toLowerCase();
  if (ip.includes(":")) {
    return ip === "::" || ip === "::1" || ip.startsWith("fc") || ip.startsWith("fd") || /^fe[89ab]/.test(ip);
  }

  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return true;
  const [a, b] = parts;
  return a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168);
}

async function assertPublicTarget(url: URL) {
  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local")) {
    throw new Error("Only public websites can be audited.");
  }

  if (isIP(hostname)) {
    if (isPrivateAddress(hostname)) throw new Error("Only public websites can be audited.");
    return;
  }

  const addresses = await lookup(hostname, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error("Only public websites can be audited.");
  }
}

async function fetchPublicPage(initialUrl: URL) {
  let current = initialUrl;
  const started = Date.now();

  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
    await assertPublicTarget(current);
    const response = await fetch(current, {
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.timeout(18_000),
      headers: {
        "User-Agent": "SAFA-Clarity-Audit/1.0 (+https://safa.studio)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("The website returned an invalid redirect.");
      current = new URL(location, current);
      if (!['http:', 'https:'].includes(current.protocol)) throw new Error("The website redirected to an unsupported address.");
      continue;
    }

    if (!response.ok) throw new Error(`The website returned HTTP ${response.status}.`);
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      throw new Error("This address does not return a public web page.");
    }

    const declaredSize = Number(response.headers.get("content-length") ?? 0);
    if (declaredSize > MAX_HTML_BYTES) throw new Error("This page is too large for the quick audit.");

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_HTML_BYTES) throw new Error("This page is too large for the quick audit.");

    return {
      html: new TextDecoder().decode(buffer),
      url: current,
      bytes: buffer.byteLength,
      responseMs: Date.now() - started,
    };
  }

  throw new Error("The website redirected too many times.");
}

function count(pattern: RegExp, value: string) {
  return value.match(pattern)?.length ?? 0;
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function textLength(value: string) {
  return value.replace(/\s+/g, " ").trim().length;
}

function scoreCategory(checks: Array<{ points: number; maxPoints: number }>) {
  const points = checks.reduce((sum, check) => sum + check.points, 0);
  const maxPoints = checks.reduce((sum, check) => sum + check.maxPoints, 0);
  return clamp((points / maxPoints) * 100);
}

function statusFor(points: number, maxPoints: number) {
  if (points >= maxPoints) return "pass";
  if (points > 0) return "warn";
  return "fail";
}

export async function POST(request: Request) {
  let requestIsArabic = false;
  try {
    const body = (await request.json()) as { url?: unknown; locale?: unknown };
    const ar = body.locale === "ar";
    requestIsArabic = ar;
    if (typeof body.url !== "string" || body.url.length > 2048) {
      return NextResponse.json({ error: ar ? "أدخل رابط موقع صالحًا." : "Please enter a valid website URL." }, { status: 400 });
    }

    let target: URL;
    try {
      target = new URL(body.url.match(/^https?:\/\//i) ? body.url : `https://${body.url}`);
    } catch {
      return NextResponse.json({ error: ar ? "أدخل رابط موقع صالحًا." : "Please enter a valid website URL." }, { status: 400 });
    }
    if (!['http:', 'https:'].includes(target.protocol)) {
      return NextResponse.json({ error: ar ? "يمكن فحص مواقع HTTP وHTTPS العامة فقط." : "Only public HTTP and HTTPS websites can be audited." }, { status: 400 });
    }

    const page = await fetchPublicPage(target);
    const html = page.html;
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
    const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim() ??
      html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1]?.trim() ?? "";
    const h1Count = count(/<h1\b/gi, html);
    const imageCount = count(/<img\b/gi, html);
    const altCount = count(/<img\b[^>]*\balt\s*=/gi, html);
    const lazyImageCount = count(/<img\b[^>]*\bloading\s*=\s*["']lazy["'][^>]*>/gi, html);
    const scriptCount = count(/<script\b/gi, html);
    const stylesheetCount = count(/<link[^>]+rel=["']stylesheet["']/gi, html);
    const inputCount = count(/<(input|select|textarea)\b/gi, html);
    const labelCount = count(/<label\b/gi, html);
    const ariaNamedInputCount = count(/<(input|select|textarea)\b[^>]*\baria-(label|labelledby)\s*=/gi, html);
    const linkCount = count(/<a\b[^>]+href=/gi, html);
    const wordCount = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
    const hasLang = /<html[^>]+lang=["'][^"']+/i.test(html);
    const hasCharset = /<meta[^>]+charset=/i.test(html);
    const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
    const hasOpenGraph = /<meta[^>]+property=["']og:/i.test(html);
    const hasSemanticMain = /<main\b/i.test(html);
    const hasSemanticNav = /<nav\b/i.test(html);
    const hasInlineHandlers = /\son(click|mouseover|load)\s*=/i.test(html);
    const hasHttpAssets = page.url.protocol === "https:" && /\b(?:src|href)=["']http:\/\//i.test(html);
    const titleQuality = title.length >= 15 && title.length <= 65;
    const descriptionQuality = description.length >= 50 && description.length <= 170;
    const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? "";
    const h1Quality = textLength(h1) >= 12 && textLength(h1) <= 90;
    const altCoverage = imageCount === 0 ? 1 : altCount / imageCount;
    const labelCoverage = inputCount === 0 ? 1 : Math.min((labelCount + ariaNamedInputCount) / inputCount, 1);

    const makeCheck = (
      id: string,
      category: string,
      label: string,
      passedPoints: number,
      maxPoints: number,
      detail: string,
      recommendation: string,
    ) => ({ id, category, label, points: passedPoints, maxPoints, status: statusFor(passedPoints, maxPoints), detail, recommendation });

    const categories = [
      {
        key: "performance",
        label: ar ? "الأداء" : "Performance",
        weight: 25,
        checks: [
          makeCheck("response-time", "performance", ar ? "زمن الاستجابة" : "Server response", page.responseMs <= 800 ? 25 : page.responseMs <= 1600 ? 12 : 0, 25, `${page.responseMs}ms`, ar ? "قلّل زمن استجابة الخادم." : "Reduce server response time."),
          makeCheck("html-weight", "performance", ar ? "حجم HTML" : "HTML weight", page.bytes <= 300_000 ? 20 : page.bytes <= 700_000 ? 10 : 0, 20, `${Math.round(page.bytes / 1024)}KB`, ar ? "خفّف حجم الصفحة الأولي." : "Reduce the initial HTML weight."),
          makeCheck("script-count", "performance", ar ? "عدد السكربتات" : "Script count", scriptCount <= 12 ? 20 : scriptCount <= 24 ? 10 : 0, 20, `${scriptCount}`, ar ? "راجع السكربتات غير الضرورية." : "Review nonessential scripts."),
          makeCheck("stylesheet-count", "performance", ar ? "ملفات التنسيق" : "Stylesheets", stylesheetCount <= 6 ? 15 : stylesheetCount <= 10 ? 8 : 0, 15, `${stylesheetCount}`, ar ? "ادمج أو أخّر ملفات التنسيق عند الإمكان." : "Consolidate or defer stylesheet loading where possible."),
          makeCheck("lazy-images", "performance", ar ? "تحميل الصور" : "Image loading", imageCount === 0 || lazyImageCount / imageCount >= 0.5 ? 20 : lazyImageCount > 0 ? 10 : 0, 20, imageCount === 0 ? "0 images" : `${lazyImageCount}/${imageCount} lazy`, ar ? "استخدم التحميل الكسول للصور خارج الشاشة." : "Lazy-load images that are below the fold."),
        ],
      },
      {
        key: "accessibility",
        label: ar ? "سهولة الوصول" : "Accessibility",
        weight: 20,
        checks: [
          makeCheck("lang", "accessibility", ar ? "لغة الصفحة" : "Page language", hasLang ? 18 : 0, 18, hasLang ? "Present" : "Missing", ar ? "أضف خاصية lang إلى وسم html." : "Add a lang attribute to the html element."),
          makeCheck("main", "accessibility", ar ? "منطقة المحتوى" : "Main landmark", hasSemanticMain ? 16 : 0, 16, hasSemanticMain ? "Present" : "Missing", ar ? "استخدم وسم main للمحتوى الأساسي." : "Use a main landmark for the primary content."),
          makeCheck("nav", "accessibility", ar ? "منطقة التنقل" : "Navigation landmark", hasSemanticNav ? 14 : 0, 14, hasSemanticNav ? "Present" : "Missing", ar ? "استخدم وسم nav للتنقل الرئيسي." : "Wrap primary navigation in a nav landmark."),
          makeCheck("image-alt", "accessibility", ar ? "نصوص الصور" : "Image alt attributes", altCoverage >= 0.9 ? 26 : altCoverage >= 0.6 ? 13 : 0, 26, `${altCount}/${imageCount}`, ar ? "أضف خاصية alt للصور، حتى إن كانت فارغة للصور الزخرفية." : "Add alt attributes to images, including empty alt for decorative images."),
          makeCheck("form-labels", "accessibility", ar ? "أسماء الحقول" : "Form names", labelCoverage >= 0.9 ? 26 : labelCoverage >= 0.6 ? 13 : 0, 26, `${labelCount + ariaNamedInputCount}/${inputCount}`, ar ? "اربط كل حقل بعنوان أو اسم ARIA واضح." : "Give every form control a label or clear ARIA name."),
        ],
      },
      {
        key: "seo",
        label: ar ? "الظهور في البحث" : "Search visibility",
        weight: 25,
        checks: [
          makeCheck("title", "seo", ar ? "عنوان الصفحة" : "Page title", titleQuality ? 24 : title ? 10 : 0, 24, title ? `${title.length} chars` : "Missing", ar ? "اكتب عنوانًا محددًا بين 15 و65 حرفًا." : "Use a specific title between 15 and 65 characters."),
          makeCheck("description", "seo", ar ? "وصف الصفحة" : "Meta description", descriptionQuality ? 24 : description ? 10 : 0, 24, description ? `${description.length} chars` : "Missing", ar ? "اكتب وصفًا بين 50 و170 حرفًا." : "Write a meta description between 50 and 170 characters."),
          makeCheck("h1", "seo", ar ? "عنوان H1" : "H1 structure", h1Count === 1 && h1Quality ? 22 : h1Count === 1 ? 12 : 0, 22, `${h1Count} found`, ar ? "استخدم عنوان H1 واحدًا وواضحًا." : "Use one clear H1 on the page."),
          makeCheck("canonical", "seo", ar ? "الرابط الأساسي" : "Canonical URL", hasCanonical ? 14 : 0, 14, hasCanonical ? "Present" : "Missing", ar ? "أضف رابط canonical لتجنب التكرار." : "Add a canonical URL to reduce duplication risk."),
          makeCheck("open-graph", "seo", ar ? "مشاركة الرابط" : "Social preview", hasOpenGraph ? 16 : 0, 16, hasOpenGraph ? "Present" : "Missing", ar ? "أضف وسوم Open Graph للمعاينة." : "Add Open Graph tags for link previews."),
        ],
      },
      {
        key: "bestPractices",
        label: ar ? "الأساس التقني" : "Technical foundation",
        weight: 15,
        checks: [
          makeCheck("https", "bestPractices", ar ? "HTTPS" : "HTTPS", page.url.protocol === "https:" ? 25 : 0, 25, page.url.protocol.replace(":", "").toUpperCase(), ar ? "استخدم HTTPS افتراضيًا." : "Serve the site over HTTPS by default."),
          makeCheck("charset", "bestPractices", ar ? "ترميز الصفحة" : "Character encoding", hasCharset ? 20 : 0, 20, hasCharset ? "Present" : "Missing", ar ? "أضف meta charset." : "Add a charset declaration."),
          makeCheck("viewport", "bestPractices", ar ? "الجوال" : "Mobile viewport", hasViewport ? 25 : 0, 25, hasViewport ? "Present" : "Missing", ar ? "أضف viewport متجاوبًا." : "Add a responsive viewport declaration."),
          makeCheck("inline-handlers", "bestPractices", ar ? "أحداث inline" : "Inline handlers", !hasInlineHandlers ? 15 : 0, 15, hasInlineHandlers ? "Found" : "None found", ar ? "تجنب أحداث JavaScript داخل HTML." : "Avoid inline JavaScript event handlers."),
          makeCheck("mixed-content", "bestPractices", ar ? "محتوى مختلط" : "Mixed content", !hasHttpAssets ? 15 : 0, 15, hasHttpAssets ? "Found" : "None found", ar ? "استبدل أصول HTTP بروابط HTTPS." : "Replace HTTP assets on HTTPS pages."),
        ],
      },
      {
        key: "clarity",
        label: ar ? "وضوح التجربة" : "Experience clarity",
        weight: 15,
        checks: [
          makeCheck("clear-h1", "clarity", ar ? "رسالة الصفحة" : "Primary message", h1Quality ? 24 : h1 ? 10 : 0, 24, h1 ? `${textLength(h1)} chars` : "Missing", ar ? "اجعل العنوان الرئيسي واضحًا ومحددًا." : "Make the main headline clear and specific."),
          makeCheck("content-depth", "clarity", ar ? "محتوى كافٍ" : "Content depth", wordCount >= 250 ? 20 : wordCount >= 120 ? 10 : 0, 20, `${wordCount} words`, ar ? "أضف محتوى كافيًا يشرح العرض." : "Add enough content to explain the offer."),
          makeCheck("navigation-depth", "clarity", ar ? "روابط التنقل" : "Navigation options", linkCount >= 5 ? 18 : linkCount >= 3 ? 9 : 0, 18, `${linkCount} links`, ar ? "وفّر روابط واضحة للأقسام المهمة." : "Provide clear paths to important sections."),
          makeCheck("metadata-match", "clarity", ar ? "اتساق الرسالة" : "Message consistency", title && h1 && title.toLowerCase() !== h1.toLowerCase() ? 18 : title && h1 ? 9 : 0, 18, title && h1 ? "Title + H1 found" : "Missing title or H1", ar ? "اجعل العنوان، H1، والوصف يعملون معًا دون تكرار كامل." : "Make the title, H1, and description work together without exact repetition."),
          makeCheck("description-clarity", "clarity", ar ? "وصف قبل النقر" : "Pre-click clarity", descriptionQuality ? 20 : description ? 10 : 0, 20, description ? `${description.length} chars` : "Missing", ar ? "اكتب وصفًا يوضح قيمة الصفحة قبل فتحها." : "Use the description to clarify the page before a visitor clicks."),
        ],
      },
    ].map((category) => ({ ...category, score: scoreCategory(category.checks) }));

    const categoryByKey = Object.fromEntries(categories.map((category) => [category.key, category.score]));
    const overall = clamp(categories.reduce((sum, category) => sum + category.score * category.weight, 0) / categories.reduce((sum, category) => sum + category.weight, 0));
    const failedChecks = categories.flatMap((category) => category.checks.filter((check) => check.status !== "pass").map((check) => ({ ...check, categoryLabel: category.label })));
    const recommendations = failedChecks
      .sort((a, b) => (b.maxPoints - b.points) - (a.maxPoints - a.points))
      .slice(0, 5)
      .map((check) => `${check.categoryLabel}: ${check.recommendation}`);
    if (recommendations.length === 0) {
      recommendations.push(ar ? "الأساس قوي حسب هذا الفحص السريع. راجع الآن جودة المحتوى ومسار التحويل يدويًا." : "The quick audit found a strong foundation. Next, review content quality and conversion paths manually.");
    }

    return NextResponse.json({
      url: page.url.toString(),
      overall,
      scores: {
        performance: categoryByKey.performance,
        accessibility: categoryByKey.accessibility,
        bestPractices: categoryByKey.bestPractices,
        seo: categoryByKey.seo,
        clarity: categoryByKey.clarity,
      },
      categories,
      recommendations,
      auditedAt: new Date().toISOString(),
      metrics: {
        responseMs: page.responseMs,
        htmlKilobytes: Math.round(page.bytes / 1024),
        scripts: scriptCount,
        stylesheets: stylesheetCount,
        images: imageCount,
        links: linkCount,
        words: wordCount,
      },
      method: ar
        ? "فحص موضوعي سريع يعتمد على HTML العام، زمن الاستجابة، والوسوم الأساسية. لا يحل محل Lighthouse أو اختبار مستخدم كامل."
        : "Objective quick audit based on public HTML, response timing, and core page signals. It does not replace Lighthouse or a full user test.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The audit service is temporarily unavailable.";
    return NextResponse.json({ error: requestIsArabic ? "تعذر فحص هذا الموقع حاليًا. تأكد أن الرابط عام وحاول مرة أخرى." : message }, { status: 422 });
  }
}
