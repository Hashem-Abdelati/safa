import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "samples", "clinic");
const routes = ["index", "about", "services", "doctors", "patient-info", "book", "contact", "case-study"];

const image = {
  hero: "https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?auto=format&fit=crop&w=1800&q=82",
  room: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1500&q=82",
  consult: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=82",
  care: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=82",
  team: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1400&q=82",
  detail: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=82",
};

const nav = [
  ["index", "Home", "الرئيسية"],
  ["about", "About", "عن العيادة"],
  ["services", "Services", "الخدمات"],
  ["doctors", "Doctors", "الأطباء"],
  ["patient-info", "Patient Info", "معلومات المرضى"],
  ["contact", "Contact", "اتصل بنا"],
];

const services = [
  ["General consultations", "استشارات عامة", "A careful first assessment with a plain-language plan for what happens next.", "تقييم أولي دقيق مع خطة واضحة للخطوة التالية."],
  ["Preventive checkups", "فحوصات وقائية", "Annual reviews, screenings, and risk checks shaped around age and history.", "مراجعات سنوية وفحوصات وقائية حسب العمر والتاريخ الصحي."],
  ["Family medicine", "طب الأسرة", "Consistent care for adults, children, and everyday health concerns.", "رعاية مستمرة للبالغين والأطفال والاحتياجات اليومية."],
  ["Follow-up care", "متابعة علاجية", "Results, referrals, chronic conditions, and treatment reviews kept organized.", "تنظيم النتائج والإحالات والحالات المزمنة ومراجعات العلاج."],
];

const doctors = [
  ["Dr. Lina Haddad", "د. لينا حداد", "Family Medicine", "طب الأسرة", image.consult, "Preventive care, long-term follow-up, Arabic and English consultations."],
  ["Dr. Omar Khalil", "د. عمر خليل", "Internal Medicine", "الطب الباطني", image.care, "Diagnostics, adult health, treatment reviews, and clear next-step planning."],
  ["Dr. Rania Nasser", "د. رانيا ناصر", "Pediatrics", "طب الأطفال", image.team, "Children's visits, family guidance, vaccinations, and growth checks."],
];

function href(route) {
  return route === "index" ? "/samples/clinic/index.html" : `/samples/clinic/${route}/index.html`;
}

function icon(name) {
  const common = 'aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const paths = {
    arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"></path>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M8 2v4M16 2v4M3 10h18"></path>',
    map: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"></path><circle cx="12" cy="10" r="2.5"></circle>',
    check: '<path d="m5 12 4 4L19 6"></path>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"></path>',
  };
  return `<svg ${common}>${paths[name]}</svg>`;
}

function localized(en, ar) {
  return `<span data-en>${en}</span><span data-ar>${ar}</span>`;
}

function shell(route, title, content) {
  const active = route;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} - Aster Clinic</title>
  <meta name="description" content="A premium private clinic website concept created for the SAFA portfolio.">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="stylesheet" href="/samples/clinic/clinic-v2.css">
  <script defer src="/samples/clinic/clinic-v2.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="shell">
      <a class="brand" href="${href("index")}" aria-label="Aster Clinic home">
        <span class="brand-mark">A</span>
        <span>ASTER<small>PRIVATE CLINIC</small></span>
      </a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        ${nav.map(([key, en, ar]) => `<a class="${active === key ? "active" : ""}" href="${href(key)}">${localized(en, ar)}</a>`).join("")}
      </nav>
      <div class="header-actions">
        <button class="lang-button" type="button" data-language-toggle>العربية</button>
        <a class="button button-small" href="${href("book")}">${localized("Book", "احجز")}</a>
        <button class="menu-button" type="button" data-menu-toggle aria-label="Open menu">${icon("menu")}</button>
      </div>
    </div>
    <nav class="mobile-nav" data-mobile-nav aria-label="Mobile navigation">
      ${nav.map(([key, en, ar]) => `<a href="${href(key)}">${localized(en, ar)}</a>`).join("")}
      <a href="${href("book")}">${localized("Book appointment", "احجز موعداً")}</a>
    </nav>
  </header>
  <main id="main">${content}</main>
  <footer class="footer">
    <div class="shell footer-grid">
      <div>
        <a class="brand brand-light" href="${href("index")}"><span class="brand-mark">A</span><span>ASTER<small>PRIVATE CLINIC</small></span></a>
        <p>${localized("A calm, modern private clinic concept for appointments, services, doctors, and patient guidance.", "مفهوم عيادة خاصة حديثة للمواعيد والخدمات والأطباء وإرشاد المرضى.")}</p>
      </div>
      <div><h3>${localized("Visit", "زيارة")}</h3><p>${localized("14 Al-Kindi Street<br>Abdoun, Amman", "شارع الكندي 14<br>عبدون، عمّان")}</p></div>
      <div><h3>${localized("Contact", "تواصل")}</h3><a href="tel:+96265550184">+962 6 555 0184</a><a href="mailto:hello@asterclinic.jo">hello@asterclinic.jo</a></div>
      <div><h3>${localized("SAFA", "صفاء")}</h3><a href="${href("case-study")}">${localized("View case study", "شاهد دراسة الحالة")}</a></div>
    </div>
  </footer>
  <div class="mobile-cta"><a class="button button-secondary" href="tel:+96265550184">${icon("phone")}${localized("Call", "اتصال")}</a><a class="button" href="${href("book")}">${icon("calendar")}${localized("Book", "حجز")}</a></div>
</body>
</html>`;
}

function compactIntro(labelEn, labelAr, titleEn, titleAr, copyEn, copyAr) {
  return `<section class="compact-intro shell">
    <p class="eyebrow">${localized(labelEn, labelAr)}</p>
    <div>
      <h1>${localized(titleEn, titleAr)}</h1>
      <p>${localized(copyEn, copyAr)}</p>
    </div>
  </section>`;
}

const bookBand = `<section class="book-band">
  <div class="shell book-band-grid">
    <div><p class="eyebrow">${localized("Appointments", "المواعيد")}</p><h2>${localized("Make the next step obvious.", "اجعل الخطوة التالية واضحة.")}</h2><p>${localized("Choose a service and preferred time. The reception team calls to confirm.", "اختر الخدمة والوقت المناسب، وسيتصل فريق الاستقبال للتأكيد.")}</p></div>
    <div class="button-row"><a class="button button-light" href="${href("book")}">${localized("Book appointment", "احجز موعداً")}${icon("arrow")}</a><a class="button button-outline-light" href="tel:+96265550184">${icon("phone")}${localized("Call clinic", "اتصل بالعيادة")}</a></div>
  </div>
</section>`;

const pages = {
  index: shell("index", "Modern private care", `<section class="hero shell">
    <div class="hero-copy">
      <p class="eyebrow">${localized("Private multi-specialty clinic - Amman", "عيادة خاصة متعددة التخصصات - عمّان")}</p>
      <h1>${localized("Private care, easier to trust and book.", "رعاية خاصة أسهل للثقة والحجز.")}</h1>
      <p>${localized("A premium healthcare website concept that helps patients understand services, compare doctors, and book without friction.", "مفهوم موقع صحي فاخر يساعد المرضى على فهم الخدمات ومقارنة الأطباء والحجز بسهولة.")}</p>
      <div class="button-row"><a class="button" href="${href("book")}">${localized("Book appointment", "احجز موعداً")}${icon("arrow")}</a><a class="button button-secondary" href="${href("services")}">${localized("Explore services", "استعرض الخدمات")}</a></div>
    </div>
    <figure class="hero-image">
      <img src="${image.hero}" alt="Doctor consulting a patient in a modern clinic office">
      <figcaption><strong>Same-week access</strong><span>Consultations, checkups, and follow-up planning.</span></figcaption>
    </figure>
  </section>
  <section class="quick-strip shell" aria-label="Clinic highlights">
    <div><strong>08:30-18:00</strong><span>${localized("Sunday to Thursday", "الأحد إلى الخميس")}</span></div>
    <div><strong>4</strong><span>${localized("Core care pathways", "مسارات رعاية أساسية")}</span></div>
    <div><strong>24h</strong><span>${localized("Typical confirmation time", "وقت التأكيد المعتاد")}</span></div>
    <div><strong>AR / EN</strong><span>${localized("Bilingual patient experience", "تجربة ثنائية اللغة")}</span></div>
  </section>
  <section class="section shell split-feature">
    <div><p class="eyebrow">${localized("Why this works", "لماذا يعمل")}</p><h2>${localized("The site feels medical, but not cold.", "الموقع طبي دون أن يكون بارداً.")}</h2><p>${localized("Patients get the practical pieces first: services, appointment paths, doctor fit, location, hours, and preparation details.", "يحصل المرضى على المعلومات العملية أولاً: الخدمات، مسارات الحجز، الطبيب المناسب، الموقع، ساعات العمل، وتفاصيل التحضير.")}</p></div>
    <img src="${image.room}" alt="Modern hospital corridor with clean natural light">
  </section>
  <section class="section shell">
    <div class="section-line"><p class="eyebrow">${localized("Services", "الخدمات")}</p><a class="text-link" href="${href("services")}">${localized("View all", "عرض الكل")}${icon("arrow")}</a></div>
    <div class="service-grid">${services.map(([en, ar, copy, arCopy], i) => `<a class="service-card" href="${href("services")}"><span>${String(i + 1).padStart(2, "0")}</span><h3>${localized(en, ar)}</h3><p>${localized(copy, arCopy)}</p></a>`).join("")}</div>
  </section>
  <section class="section shell doctor-showcase">
    <div><p class="eyebrow">${localized("Doctors", "الأطباء")}</p><h2>${localized("Profiles built for fast confidence.", "ملفات تمنح الثقة بسرعة.")}</h2></div>
    <div class="doctor-grid">${doctors.map(([name, arName, spec, arSpec, img]) => `<article class="doctor-card"><img src="${img}" alt="${name}"><div><p>${localized(spec, arSpec)}</p><h3>${localized(name, arName)}</h3></div></article>`).join("")}</div>
  </section>
  ${bookBand}`),

  about: shell("about", "About", `${compactIntro("About", "عن العيادة", "A clinic experience designed around attention.", "تجربة عيادة مصممة حول الاهتمام.", "Aster is fictional, but the product thinking is real: clarity, confidence, and a patient path that feels organized from the first click.", "أستر عيادة تخيلية، لكن التفكير في المنتج حقيقي: وضوح وثقة ومسار مريض منظم منذ النقرة الأولى.")}
  <section class="section shell editorial">
    <img src="${image.detail}" alt="Doctor reviewing patient care notes on a tablet">
    <div><p class="eyebrow">${localized("Perspective", "الرؤية")}</p><h2>${localized("Less noise. More trust.", "ضجيج أقل. ثقة أكثر.")}</h2><p>${localized("The design keeps visual energy in photography, details, and micro-layouts instead of oversized slogans. Every section has a job.", "يحافظ التصميم على الحيوية من خلال الصور والتفاصيل وتكوين الصفحة بدلاً من العناوين الكبيرة. لكل قسم وظيفة واضحة.")}</p><ul class="check-list"><li>${localized("Plain-language patient information", "معلومات مرضى بلغة واضحة")}</li><li>${localized("Fast appointment and call paths", "مسارات حجز واتصال سريعة")}</li><li>${localized("Clear proof of services and expertise", "إظهار واضح للخدمات والخبرة")}</li></ul></div>
  </section>${bookBand}`),

  services: shell("services", "Services", `${compactIntro("Services", "الخدمات", "Care paths patients can understand quickly.", "مسارات رعاية سهلة الفهم بسرعة.", "No jargon wall. Just the service, what it is for, and the next step.", "لا جدار من المصطلحات. فقط الخدمة والغرض منها والخطوة التالية.")}
  <section class="section shell"><div class="services-directory">${services.map(([en, ar, copy, arCopy], i) => `<article class="directory-card"><span>${String(i + 1).padStart(2, "0")}</span><div><h2>${localized(en, ar)}</h2><p>${localized(copy, arCopy)}</p></div><a class="text-link" href="${href("book")}">${localized("Book", "احجز")}${icon("arrow")}</a></article>`).join("")}</div></section>${bookBand}`),

  doctors: shell("doctors", "Doctors", `${compactIntro("Doctors", "الأطباء", "A team section that feels human, not generic.", "قسم أطباء يبدو إنسانياً لا نمطياً.", "Profiles show specialty, practical strengths, and availability without forcing patients through clutter.", "تعرض الملفات التخصص ونقاط القوة والتوفر دون ازدحام.")}
  <section class="section shell doctor-list">${doctors.map(([name, arName, spec, arSpec, img, bio]) => `<article class="profile-card"><img src="${img}" alt="${name}"><div><p class="eyebrow">${localized(spec, arSpec)}</p><h2>${localized(name, arName)}</h2><p>${bio}</p><dl><div><dt>${localized("Languages", "اللغات")}</dt><dd>${localized("Arabic, English", "العربية، الإنجليزية")}</dd></div><div><dt>${localized("Availability", "أيام التواجد")}</dt><dd>${localized("Sunday-Wednesday", "الأحد-الأربعاء")}</dd></div></dl><a class="button button-secondary" href="${href("book")}">${localized("Book with doctor", "احجز مع الطبيب")}</a></div></article>`).join("")}</section>${bookBand}`),

  "patient-info": shell("patient-info", "Patient Info", `${compactIntro("Patient Info", "معلومات المرضى", "Practical details before the visit.", "تفاصيل عملية قبل الزيارة.", "A strong clinic site answers common operational questions before they become phone calls.", "موقع العيادة القوي يجيب عن الأسئلة العملية قبل أن تتحول إلى اتصالات.")}
  <section class="section shell info-layout">
    ${["Before your visit", "Test results", "Insurance & payments", "Appointment changes", "Follow-up visits", "Accessibility"].map((item, i) => `<article><span>${String(i + 1).padStart(2, "0")}</span><h2>${item}</h2><p>${["Bring ID, medications, and any recent reports so your consultation starts with context.", "Results are reviewed by your doctor and shared with a clear explanation of the next step.", "Coverage varies by provider. Call before booking to confirm current network status.", "Plans change. Early rescheduling keeps appointment slots available for other patients.", "Your doctor will suggest timing before you leave, with reminders kept simple.", "The website prioritizes readable contrast, large tap targets, and direct navigation."][i]}</p></article>`).join("")}
  </section>${bookBand}`),

  book: shell("book", "Book", `${compactIntro("Book", "الحجز", "A booking flow with just enough detail.", "نموذج حجز بتفاصيل كافية فقط.", "This static demo shows the conversion path a real clinic website would refine and connect to operations.", "يعرض هذا النموذج الثابت مسار التحويل الذي يمكن ربطه بعمليات العيادة.")}
  <section class="section shell booking-layout"><form class="booking-form" data-demo-form><div class="form-grid">
    ${["Full name", "Phone number", "Email", "Preferred date"].map((label, i) => `<label>${label}<input required type="${i === 2 ? "email" : i === 3 ? "date" : "text"}"></label>`).join("")}
    <label>Service<select required><option value="">Select a service</option>${services.map(([en]) => `<option>${en}</option>`).join("")}</select></label>
    <label>Preferred doctor<select><option>First available</option>${doctors.map(([name]) => `<option>${name}</option>`).join("")}</select></label>
    <label class="full">Message<textarea rows="5" placeholder="Briefly describe what you need. Do not include urgent medical information."></textarea></label>
  </div><button class="button submit" type="submit">${localized("Request appointment", "اطلب موعداً")}${icon("arrow")}</button><p class="form-status" data-form-status hidden>Request received. The clinic team would call to confirm.</p></form><aside class="booking-aside"><img src="${image.hero}" alt="Doctor and patient during a calm appointment"><div><h2>${localized("Clinic details", "تفاصيل العيادة")}</h2><p>+962 6 555 0184<br>Sunday-Thursday, 8:30 AM-6:00 PM<br>14 Al-Kindi Street, Abdoun</p></div></aside></section>`),

  contact: shell("contact", "Contact", `${compactIntro("Contact", "تواصل", "Location, phone, and hours without the clutter.", "الموقع والهاتف والساعات دون ازدحام.", "The page gives patients immediate ways to act, then supports them with arrival information.", "تقدم الصفحة طرق تصرف فورية ثم تدعم المرضى بمعلومات الوصول.")}
  <section class="section shell contact-layout"><div class="contact-panel"><a class="button" href="tel:+96265550184">${icon("phone")}${localized("Call +962 6 555 0184", "اتصل +962 6 555 0184")}</a><a class="button button-secondary" href="${href("book")}">${localized("Book online", "احجز عبر الموقع")}</a><dl><div><dt>Address</dt><dd>14 Al-Kindi Street, Abdoun, Amman</dd></div><div><dt>Hours</dt><dd>Sunday-Thursday, 8:30 AM-6:00 PM</dd></div><div><dt>Email</dt><dd>hello@asterclinic.jo</dd></div></dl></div><div class="map-card"><img src="${image.room}" alt="Clean clinic corridor used as a location visual"><span>${icon("map")} Aster Clinic, Abdoun</span></div></section>${bookBand}`),

  "case-study": shell("case-study", "Case Study", `${compactIntro("SAFA Case Study", "دراسة حالة صفاء", "How a standard clinic brief becomes a premium patient experience.", "كيف يتحول طلب عيادة عادي إلى تجربة مرضى راقية.", "This concept shows the level of polish SAFA can bring to a service business: UX structure, image direction, responsive design, and conversion clarity.", "يعرض هذا المفهوم مستوى الصقل الذي تقدمه صفاء: هيكل تجربة المستخدم، اتجاه الصور، التصميم المتجاوب، ووضوح التحويل.")}
  <section class="section shell case-grid"><div><p class="eyebrow">Challenge</p><h2>Most clinic sites feel either cold or crowded.</h2></div><p>The redesign removes decorative shapes, reduces repeated headers, and uses strong page composition with real imagery. The result feels premium without making the site hard to use.</p><div><p class="eyebrow">Result</p><h2>A complete sample that sells design quality.</h2></div><p>Home, services, doctors, patient information, booking, contact, and case-study pages now feel like a cohesive healthcare brand instead of disconnected template screens.</p></section><section class="section case-proof"><div class="shell"><img src="${image.hero}" alt="Doctor consultation used as visual proof"><div><p class="eyebrow">Included scope</p><div class="feature-grid">${["Real photography direction", "Compact internal pages", "Responsive mobile CTA", "Bilingual-ready content", "Booking form flow", "Doctor/service structure"].map((x, i) => `<span>${String(i + 1).padStart(2, "0")} ${x}</span>`).join("")}</div></div></div></section>${bookBand}`),
};

mkdirSync(out, { recursive: true });
writeFileSync(path.join(out, "clinic-v2.css"), `@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');
:root{--ink:#0d2d35;--muted:#597078;--paper:#fbfbf7;--soft:#eaf7f7;--line:#d8e5e3;--cyan:#0e7490;--green:#087f5b;--deep:#082f3a;--white:#fff;--container:1180px}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:Figtree,Arial,sans-serif;font-size:16px;line-height:1.55}body[data-lang=ar]{direction:rtl}a{color:inherit;text-decoration:none}img{max-width:100%;display:block;object-fit:cover}button,input,select,textarea{font:inherit}.skip-link{position:absolute;left:16px;top:-60px;background:var(--ink);color:white;padding:10px 14px;z-index:100}.skip-link:focus{top:12px}.shell{width:min(100% - 40px,var(--container));margin-inline:auto}.site-header{position:sticky;top:0;z-index:50;background:rgba(251,251,247,.92);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.site-header>.shell{height:78px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:inline-flex;align-items:center;gap:11px;font-weight:800;letter-spacing:.16em}.brand-mark{width:39px;height:39px;border:1px solid var(--ink);border-radius:50%;display:grid;place-items:center;letter-spacing:0}.brand small{display:block;font-size:.58rem;font-weight:600;color:var(--muted);letter-spacing:.22em}.desktop-nav{display:flex;gap:4px}.desktop-nav a{padding:10px 12px;border-radius:999px;color:var(--muted);font-weight:600;font-size:.92rem}.desktop-nav a:hover,.desktop-nav a.active{background:white;color:var(--ink);box-shadow:0 0 0 1px var(--line)}.header-actions{display:flex;align-items:center;gap:8px}.lang-button,.menu-button{border:1px solid var(--line);background:white;color:var(--ink);min-height:44px;border-radius:999px;padding:0 14px;cursor:pointer}.menu-button{display:none;width:46px;padding:0}.menu-button svg,.button svg,.text-link svg{width:18px;height:18px}.mobile-nav{display:none}.button{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:48px;padding:13px 18px;border:1px solid var(--deep);background:var(--deep);color:white;border-radius:999px;font-weight:700;cursor:pointer;transition:background .2s,border-color .2s,color .2s}.button:hover{background:#0f4552}.button-secondary{background:white;color:var(--deep);border-color:var(--line)}.button-secondary:hover{border-color:var(--deep);background:#f7fcfb}.button-light{background:white;color:var(--deep);border-color:white}.button-outline-light{background:transparent;color:white;border-color:rgba(255,255,255,.35)}.button-small{min-height:42px;padding:10px 15px}.button-row{display:flex;flex-wrap:wrap;gap:10px}.eyebrow{margin:0 0 14px;text-transform:uppercase;letter-spacing:.18em;font-size:.72rem;font-weight:800;color:var(--cyan)}h1,h2,h3,p{margin-top:0}h1{font-size:clamp(2.9rem,6.8vw,5.7rem);line-height:.91;letter-spacing:0;margin-bottom:24px}h2{font-size:clamp(2rem,4vw,4.2rem);line-height:.98;letter-spacing:0;margin-bottom:18px}h3{font-size:1.18rem;line-height:1.15}.hero{display:grid;grid-template-columns:.95fr 1.05fr;gap:56px;align-items:center;padding:58px 0 42px}.hero-copy p:not(.eyebrow){font-size:1.18rem;color:var(--muted);max-width:620px;margin-bottom:26px}.hero-image{position:relative;margin:0;min-height:560px;overflow:hidden;border-radius:8px;background:var(--soft)}.hero-image img{width:100%;height:560px}.hero-image figcaption{position:absolute;left:22px;right:22px;bottom:22px;display:flex;justify-content:space-between;gap:20px;padding:16px 18px;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.55);border-radius:6px}.hero-image span,.quick-strip span{color:var(--muted)}.quick-strip{display:grid;grid-template-columns:repeat(4,1fr);border-block:1px solid var(--line);margin-bottom:50px}.quick-strip div{padding:22px}.quick-strip div+div{border-inline-start:1px solid var(--line)}.quick-strip strong{display:block;font-size:1.45rem}.section{padding:86px 0}.section-line{display:flex;justify-content:space-between;align-items:end;gap:24px;margin-bottom:28px}.text-link{display:inline-flex;align-items:center;gap:8px;color:var(--green);font-weight:800}.split-feature,.editorial{display:grid;grid-template-columns:.8fr 1.2fr;gap:70px;align-items:center}.split-feature img,.editorial img,.map-card img{width:100%;height:500px;border-radius:8px}.split-feature p,.editorial p{color:var(--muted);font-size:1.05rem}.service-grid{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line);border-radius:8px;overflow:hidden;background:white}.service-card{padding:26px;min-height:230px;display:flex;flex-direction:column;transition:background .2s}.service-card:hover{background:var(--soft)}.service-card+*{border-inline-start:1px solid var(--line)}.service-card span,.directory-card>span,.info-layout span,.feature-grid span{color:var(--cyan);font-weight:800;font-size:.78rem;letter-spacing:.12em}.service-card h3{margin-top:auto}.service-card p,.directory-card p,.info-layout p,.profile-card p,.case-grid p{color:var(--muted)}.doctor-showcase{display:grid;grid-template-columns:.45fr 1fr;gap:45px;align-items:start}.doctor-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.doctor-card{background:white;border:1px solid var(--line);border-radius:8px;overflow:hidden}.doctor-card img{height:280px;width:100%}.doctor-card div{padding:18px}.doctor-card p{margin-bottom:6px;color:var(--green);font-weight:800;font-size:.8rem;text-transform:uppercase;letter-spacing:.1em}.compact-intro{display:grid;grid-template-columns:240px 1fr;gap:70px;padding:54px 0 38px;border-bottom:1px solid var(--line)}.compact-intro h1{font-size:clamp(2.4rem,4.8vw,4.6rem);max-width:900px}.compact-intro p:not(.eyebrow){font-size:1.12rem;color:var(--muted);max-width:770px}.check-list{list-style:none;padding:0;margin:24px 0 0;display:grid;gap:10px}.check-list li{padding-left:24px;position:relative}.check-list li:before{content:"";position:absolute;left:0;top:.7em;width:10px;height:10px;border-radius:50%;background:var(--green)}body[data-lang=ar] .check-list li{padding-left:0;padding-right:24px}body[data-lang=ar] .check-list li:before{left:auto;right:0}.services-directory{display:grid;border-top:1px solid var(--line)}.directory-card{display:grid;grid-template-columns:70px 1fr auto;gap:24px;align-items:center;padding:30px 0;border-bottom:1px solid var(--line)}.directory-card h2{font-size:2rem;margin-bottom:8px}.doctor-list{display:grid;gap:18px}.profile-card{display:grid;grid-template-columns:360px 1fr;gap:34px;padding:18px;background:white;border:1px solid var(--line);border-radius:8px}.profile-card img{height:360px;width:100%;border-radius:6px}.profile-card dl{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:24px 0}.profile-card dt{font-size:.7rem;text-transform:uppercase;letter-spacing:.14em;color:var(--cyan);font-weight:800}.profile-card dd{margin:0}.info-layout{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.info-layout article{background:white;border:1px solid var(--line);padding:28px;border-radius:8px;min-height:250px}.booking-layout,.contact-layout{display:grid;grid-template-columns:1.15fr .85fr;gap:42px;align-items:start}.booking-form,.contact-panel{background:white;border:1px solid var(--line);border-radius:8px;padding:30px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.form-grid label{display:grid;gap:8px;font-weight:700}.form-grid input,.form-grid select,.form-grid textarea{width:100%;min-height:52px;border:1px solid #c8d8d5;border-radius:6px;background:#fbfefd;padding:12px 13px;outline:none}.form-grid input:focus,.form-grid select:focus,.form-grid textarea:focus{border-color:var(--cyan);box-shadow:0 0 0 4px rgba(14,116,144,.13)}.full{grid-column:1/-1}.submit{width:100%;margin-top:20px}.form-status{margin:18px 0 0;padding:14px;background:var(--soft);border-radius:6px;color:var(--green);font-weight:800}.booking-aside,.map-card{position:sticky;top:100px;background:var(--deep);color:white;border-radius:8px;overflow:hidden}.booking-aside img,.map-card img{height:360px;width:100%;opacity:.84}.booking-aside div{padding:28px}.contact-panel .button{margin:0 8px 14px 0}.contact-panel dl{margin:26px 0 0;display:grid;gap:18px}.contact-panel dt{color:var(--cyan);font-weight:800;text-transform:uppercase;font-size:.75rem;letter-spacing:.14em}.contact-panel dd{margin:0}.map-card span{display:flex;align-items:center;gap:10px;padding:18px;font-weight:800}.map-card svg{width:20px}.case-grid{display:grid;grid-template-columns:.55fr 1fr;gap:36px 80px}.case-grid h2{font-size:2.3rem}.case-grid p{font-size:1.14rem}.case-proof{background:var(--deep);color:white}.case-proof .shell{display:grid;grid-template-columns:1fr 1fr;gap:45px;align-items:center}.case-proof img{height:500px;border-radius:8px}.case-proof .eyebrow{color:#7de0d7}.feature-grid{display:grid;gap:12px}.feature-grid span{display:block;padding:16px;border:1px solid rgba(255,255,255,.16);border-radius:6px;color:white}.book-band{background:var(--deep);color:white;padding:62px 0}.book-band-grid{display:flex;justify-content:space-between;gap:36px;align-items:end}.book-band h2{font-size:2.8rem}.book-band p:not(.eyebrow){color:#bdd2d4;max-width:620px}.book-band .eyebrow{color:#7de0d7}.footer{background:#071f27;color:white;padding:56px 0 30px}.footer-grid{display:grid;grid-template-columns:1.4fr .9fr .9fr .8fr;gap:34px}.footer p,.footer a{color:#bdd2d4;display:block;margin:7px 0}.footer h3{font-size:.85rem;text-transform:uppercase;letter-spacing:.14em;color:white}.brand-light .brand-mark{border-color:white}.mobile-cta{display:none}[data-ar]{display:none}body[data-lang=ar] [data-en]{display:none}body[data-lang=ar] [data-ar]{display:inline}body[data-lang=ar] .hero-image figcaption,body[data-lang=ar] .book-band-grid{direction:rtl}@media(max-width:980px){.desktop-nav{display:none}.menu-button{display:grid;place-items:center}.site-header>.shell{height:70px}.mobile-nav.open{display:grid;gap:8px;padding:12px 20px 18px;border-top:1px solid var(--line);background:var(--paper)}.mobile-nav a{padding:12px;background:white;border:1px solid var(--line);border-radius:6px}.hero,.split-feature,.editorial,.doctor-showcase,.compact-intro,.booking-layout,.contact-layout,.case-proof .shell{grid-template-columns:1fr;gap:34px}.hero{padding-top:42px}.hero-image,.hero-image img{min-height:0;height:460px}.quick-strip,.service-grid,.doctor-grid,.info-layout{grid-template-columns:1fr 1fr}.service-card:nth-child(odd){border-inline-start:0}.service-card:nth-child(n+3){border-top:1px solid var(--line)}.profile-card{grid-template-columns:260px 1fr}.booking-aside,.map-card{position:static}.footer-grid{grid-template-columns:1fr 1fr}}@media(max-width:640px){body{padding-bottom:74px}.shell{width:min(100% - 28px,var(--container))}.brand{font-size:.82rem}.brand-mark{width:34px;height:34px}.header-actions .button{display:none}h1{font-size:2.75rem}.hero-image,.hero-image img{height:360px}.hero-image figcaption{display:block}.quick-strip,.service-grid,.doctor-grid,.info-layout,.profile-card,.form-grid,.case-grid,.footer-grid{grid-template-columns:1fr}.quick-strip div+div,.service-card+*{border-inline-start:0;border-top:1px solid var(--line)}.section{padding:62px 0}.split-feature img,.editorial img,.case-proof img{height:360px}.compact-intro{padding-top:40px}.directory-card{grid-template-columns:42px 1fr}.directory-card .text-link{grid-column:2}.profile-card img{height:320px}.profile-card dl{grid-template-columns:1fr}.book-band-grid{display:block}.book-band .button-row{margin-top:24px}.book-band .button{width:100%}.mobile-cta{position:fixed;display:grid;grid-template-columns:1fr 1.3fr;gap:8px;left:0;right:0;bottom:0;padding:9px 12px;background:var(--paper);border-top:1px solid var(--line);z-index:60}.mobile-cta .button{min-height:54px}.contact-panel .button{width:100%;margin-right:0}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto;transition:none!important}}`);

writeFileSync(path.join(out, "clinic-v2.js"), `(() => {
  const root = document.body;
  const toggle = document.querySelector("[data-language-toggle]");
  const menu = document.querySelector("[data-menu-toggle]");
  const mobile = document.querySelector("[data-mobile-nav]");
  toggle?.addEventListener("click", () => {
    const next = root.dataset.lang === "ar" ? "en" : "ar";
    root.dataset.lang = next;
    document.documentElement.lang = next;
    toggle.textContent = next === "ar" ? "English" : "العربية";
  });
  menu?.addEventListener("click", () => mobile?.classList.toggle("open"));
  document.querySelector("[data-demo-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("[data-form-status]");
    if (status) {
      status.hidden = false;
      status.focus?.();
    }
  });
})();`);

for (const route of routes) {
  const dir = route === "index" ? out : path.join(out, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), pages[route]);
}

console.log(`clinic sample v2: wrote ${routes.length} pages`);
