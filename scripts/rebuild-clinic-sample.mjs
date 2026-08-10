import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const workspace = "/Users/hashemabdelati/Desktop/safa-website";
const target = path.join(workspace, "public", "samples", "clinic");
const assetSource = path.join(workspace, "public", "sample-assets", "clinic");

const routes = [
  ["index", "Home", "الرئيسية"],
  ["services", "Treatments", "العلاجات"],
  ["portfolio", "Results", "النتائج"],
  ["doctors", "Doctors", "الأطباء"],
  ["patient-info", "Patient Info", "إرشادات المرضى"],
  ["contact", "Contact", "التواصل"],
];

const treatments = [
  {
    title: "Facial surgery",
    titleAr: "جراحة الوجه",
    text: "Consultation-led planning for rhinoplasty, eyelid surgery, neck refinement, and facial balance.",
    textAr: "تخطيط يبدأ بالاستشارة لعمليات الأنف، الجفون، تحسين الرقبة، وتوازن ملامح الوجه.",
  },
  {
    title: "Skin health",
    titleAr: "صحة البشرة",
    text: "Laser, pigmentation, texture, acne scarring, and medical-grade maintenance programs.",
    textAr: "برامج الليزر، التصبغات، ملمس البشرة، آثار حب الشباب، والعناية الطبية المستمرة.",
  },
  {
    title: "Injectables",
    titleAr: "الحقن التجميلية",
    text: "Subtle toxin and filler treatment planned around proportion, movement, and long-term restraint.",
    textAr: "علاجات دقيقة بالبوتوكس والفيلر مبنية على التناسق والحركة والنتائج الطبيعية.",
  },
  {
    title: "Recovery care",
    titleAr: "رعاية التعافي",
    text: "Follow-up appointments, scar care, swelling review, and skin support after treatment.",
    textAr: "متابعة بعد العلاج، عناية بالندبات، مراجعة التورم، ودعم البشرة خلال التعافي.",
  },
];

const doctors = [
  {
    name: "Dr. Leila Haddad",
    nameAr: "د. ليلى حداد",
    role: "Consultant aesthetic surgeon",
    roleAr: "استشارية جراحة تجميلية",
    focus: "Facial surgery, revision consultation, recovery planning",
    focusAr: "جراحة الوجه، الاستشارات التصحيحية، وخطط التعافي",
    image: "doctor-leila.jpg",
  },
  {
    name: "Dr. Omar Nasser",
    nameAr: "د. عمر ناصر",
    role: "Dermatologist",
    roleAr: "اختصاصي جلدية",
    focus: "Laser, pigmentation, acne scarring, medical skin health",
    focusAr: "الليزر، التصبغات، آثار حب الشباب، وصحة البشرة الطبية",
    image: "doctor-omar.jpg",
  },
  {
    name: "Rania Saleh",
    nameAr: "رانيا صالح",
    role: "Nurse practitioner",
    roleAr: "ممرضة ممارِسة",
    focus: "Injectables support, preparation, post-treatment care",
    focusAr: "دعم الحقن، التحضير، ورعاية ما بعد العلاج",
    image: "doctor-rania.jpg",
  },
];

const resultCases = [
  {
    number: "01",
    title: "Facial balance and skin quality",
    titleAr: "توازن الوجه وجودة البشرة",
    text: "Same patient, same angle, same lighting, with a subtle result that feels medically credible.",
    textAr: "نفس المريضة، نفس الزاوية، نفس الإضاءة، ونتيجة هادئة تبدو واقعية طبياً.",
    focus: "Skin texture, facial balance, recovery care",
    focusAr: "ملمس البشرة، توازن الوجه، ورعاية التعافي",
    timing: "Final review after healing interval",
    timingAr: "مراجعة نهائية بعد فترة التعافي",
    image: "result-face.jpg",
    alt: "Matched before and after facial aesthetic result",
  },
  {
    number: "02",
    title: "Smile refinement",
    titleAr: "تحسين الابتسامة",
    text: "A natural dental aesthetic example with believable whitening and alignment rather than an artificial veneer look.",
    textAr: "مثال تجميلي للأسنان بنتيجة طبيعية في اللون والتناسق، من دون مظهر صناعي.",
    focus: "Whitening, proportion, natural smile line",
    focusAr: "تبييض، تناسق، وخط ابتسامة طبيعي",
    timing: "Review after shade stabilization",
    timingAr: "مراجعة بعد ثبات درجة اللون",
    image: "result-teeth.jpg",
    alt: "Matched before and after dental smile result",
  },
  {
    number: "03",
    title: "Skin texture and redness",
    titleAr: "ملمس البشرة والاحمرار",
    text: "A dermatology-led result focused on calmer redness and refined texture while preserving natural skin.",
    textAr: "نتيجة جلدية تركز على تهدئة الاحمرار وتحسين الملمس مع الحفاظ على طبيعية البشرة.",
    focus: "Acne scarring, redness, texture",
    focusAr: "آثار حب الشباب، الاحمرار، وملمس البشرة",
    timing: "Series review after treatment plan",
    timingAr: "مراجعة بعد سلسلة علاجية",
    image: "result-skin.jpg",
    alt: "Matched before and after skin texture result",
  },
];

function attr(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function tx(en, ar) {
  return `data-en="${attr(en)}" data-ar="${attr(ar)}"`;
}

function span(en, ar) {
  return `<span ${tx(en, ar)}>${en}</span>`;
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function routeHref(route) {
  return route === "index" ? "/samples/clinic/index.html" : `/samples/clinic/${route}/index.html`;
}

function nav(active) {
  return routes
    .map(([route, label, labelAr]) => `<a${route === active ? ' class="active"' : ""} href="${routeHref(route)}" ${tx(label, labelAr)}>${label}</a>`)
    .join("");
}

function page({ route, title, titleAr, description, descriptionAr, body, lead = true }) {
  const routeDir = route === "index" ? target : path.join(target, route);
  ensureDir(routeDir);
  const leadMarkup = lead
    ? `<section class="page-lead">
        <p class="kicker" ${tx("Aster Clinic", "عيادة أستر")}>Aster Clinic</p>
        <h1 ${tx(title, titleAr)}>${title}</h1>
        <p ${tx(description, descriptionAr)}>${description}</p>
      </section>`
    : "";

  writeFileSync(
    path.join(routeDir, "index.html"),
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title === "Aster Clinic" ? "Aster Clinic" : `${title} - Aster Clinic`}</title>
  <meta name="description" content="${description}">
  <link rel="icon" href="/favicon.png" sizes="512x512" type="image/png">
  <link rel="stylesheet" href="/samples/clinic/aster.css">
  <script defer src="/samples/clinic/aster.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="/samples/clinic/index.html" aria-label="Aster Clinic home">
      <span>Aster</span>
      <small ${tx("Private aesthetic clinic", "عيادة تجميل خاصة")}>Private aesthetic clinic</small>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">${nav(route)}</nav>
    <div class="header-actions">
      <button class="language-toggle" type="button" aria-label="Switch language" data-language-toggle>عربي</button>
      <a class="book-link" href="/samples/clinic/book/index.html" ${tx("Book", "احجز")}>Book</a>
      <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false"><span></span></button>
    </div>
  </header>
  <nav class="mobile-nav" aria-label="Mobile navigation">
    ${nav(route)}
    <button class="language-toggle mobile-language" type="button" aria-label="Switch language" data-language-toggle>عربي</button>
    <a class="button" href="/samples/clinic/book/index.html" ${tx("Book consultation", "احجز استشارة")}>Book consultation</a>
  </nav>
  <main id="main">
    ${leadMarkup}
    ${body}
  </main>
  ${footer()}
  <div class="mobile-cta">
    <a class="button ghost" href="tel:+962798509111" ${tx("Call", "اتصل")}>Call</a>
    <a class="button" href="/samples/clinic/book/index.html" ${tx("Book", "احجز")}>Book</a>
  </div>
</body>
</html>`,
  );
}

function footer() {
  return `<footer class="footer">
    <div>
      <a class="brand footer-brand" href="/samples/clinic/index.html">
        <span>Aster</span>
        <small ${tx("Private aesthetic clinic", "عيادة تجميل خاصة")}>Private aesthetic clinic</small>
      </a>
      <p ${tx("Quiet, doctor-led aesthetic care with clear information, consistent follow-up, and responsible result presentation.", "رعاية تجميلية هادئة يقودها الأطباء، بمعلومات واضحة، متابعة مستمرة، وعرض مسؤول للنتائج.")}>Quiet, doctor-led aesthetic care with clear information, consistent follow-up, and responsible result presentation.</p>
    </div>
    <nav aria-label="Footer navigation">
      <a href="/samples/clinic/services/index.html" ${tx("Treatments", "العلاجات")}>Treatments</a>
      <a href="/samples/clinic/portfolio/index.html" ${tx("Results", "النتائج")}>Results</a>
      <a href="/samples/clinic/doctors/index.html" ${tx("Doctors", "الأطباء")}>Doctors</a>
      <a href="/samples/clinic/contact/index.html" ${tx("Contact", "التواصل")}>Contact</a>
    </nav>
    <div>
      <span ${tx("Abdoun, Amman", "عبدون، عمّان")}>Abdoun, Amman</span>
      <span ${tx("Sun - Thu, 9:00 - 18:00", "الأحد - الخميس، 9:00 - 18:00")}>Sun - Thu, 9:00 - 18:00</span>
      <span>+962 79 850 9111</span>
    </div>
  </footer>`;
}

const treatmentCards = treatments
  .map(
    (item) => `<article class="quiet-card">
      <h3 ${tx(item.title, item.titleAr)}>${item.title}</h3>
      <p ${tx(item.text, item.textAr)}>${item.text}</p>
      <a href="/samples/clinic/book/index.html" ${tx("Discuss treatment", "ناقش العلاج")}>Discuss treatment</a>
    </article>`,
  )
  .join("");

const doctorCards = doctors
  .map(
    (doctor) => `<article class="doctor-card">
      <img src="/samples/clinic/media/${doctor.image}" alt="${doctor.name}">
      <div>
        <h3 ${tx(doctor.name, doctor.nameAr)}>${doctor.name}</h3>
        <p ${tx(doctor.role, doctor.roleAr)}>${doctor.role}</p>
        <span ${tx(doctor.focus, doctor.focusAr)}>${doctor.focus}</span>
      </div>
    </article>`,
  )
  .join("");

const resultPreviewCards = resultCases
  .map(
    (item) => `<article class="result-tile">
      <img src="/samples/clinic/media/${item.image}" alt="${item.alt}">
      <div>
        <p class="kicker">${span(`Case ${item.number}`, `الحالة ${item.number}`)}</p>
        <h3 ${tx(item.title, item.titleAr)}>${item.title}</h3>
      </div>
    </article>`,
  )
  .join("");

const resultCaseSections = resultCases
  .map(
    (item) => `<article class="result-case">
      <img src="/samples/clinic/media/${item.image}" alt="${item.alt}">
      <div>
        <p class="kicker">${span(`Case ${item.number}`, `الحالة ${item.number}`)}</p>
        <h2 ${tx(item.title, item.titleAr)}>${item.title}</h2>
        <p ${tx(item.text, item.textAr)}>${item.text}</p>
        <dl class="case-notes">
          <div><dt ${tx("Focus", "التركيز")}>Focus</dt><dd ${tx(item.focus, item.focusAr)}>${item.focus}</dd></div>
          <div><dt ${tx("Timing", "التوقيت")}>Timing</dt><dd ${tx(item.timing, item.timingAr)}>${item.timing}</dd></div>
          <div><dt ${tx("Standard", "المعيار")}>Standard</dt><dd ${tx("Consent-led photography, consistent documentation", "تصوير بموافقة واضحة وتوثيق متسق")}>Consent-led photography, consistent documentation</dd></div>
        </dl>
      </div>
    </article>`,
  )
  .join("");

function home() {
  page({
    route: "index",
    title: "Aster Clinic",
    titleAr: "عيادة أستر",
    description: "Doctor-led aesthetic care in a calm private clinic.",
    descriptionAr: "رعاية تجميلية يقودها الأطباء داخل عيادة خاصة وهادئة.",
    lead: false,
    body: `<section class="hero">
      <div class="hero-copy">
        <p class="kicker" ${tx("Private aesthetic clinic - Amman", "عيادة تجميل خاصة - عمّان")}>Private aesthetic clinic - Amman</p>
        <h1 ${tx("Calm, considered aesthetic care.", "رعاية تجميلية هادئة ومدروسة.")}>Calm, considered aesthetic care.</h1>
        <p ${tx("Aster Clinic brings consultation, skin health, facial aesthetics, and follow-up care into one quiet clinical setting.", "تجمع عيادة أستر بين الاستشارة، صحة البشرة، تجميل الوجه، والمتابعة ضمن بيئة سريرية هادئة.")}>Aster Clinic brings consultation, skin health, facial aesthetics, and follow-up care into one quiet clinical setting.</p>
        <div class="button-row">
          <a class="button" href="/samples/clinic/book/index.html" ${tx("Book consultation", "احجز استشارة")}>Book consultation</a>
          <a class="button ghost" href="/samples/clinic/portfolio/index.html" ${tx("View results", "شاهد النتائج")}>View results</a>
        </div>
      </div>
      <figure class="hero-image">
        <img src="/samples/clinic/media/interior.jpg" alt="Warm modern private clinic reception">
      </figure>
    </section>

    <section class="trust-strip" aria-label="Clinic values">
      <div><strong ${tx("Doctor-led", "بقيادة الأطباء")}>Doctor-led</strong><span ${tx("Every treatment begins with assessment and suitability.", "كل علاج يبدأ بتقييم الملاءمة قبل التوصية.")}>Every treatment begins with assessment and suitability.</span></div>
      <div><strong ${tx("Measured", "مدروس")}>Measured</strong><span ${tx("Information is clear, realistic, and easy to act on.", "المعلومات واضحة وواقعية وسهلة المتابعة.")}>Information is clear, realistic, and easy to act on.</span></div>
      <div><strong ${tx("Private", "خصوصية")}>Private</strong><span ${tx("Photography, results, and follow-up are handled carefully.", "يتم التعامل مع التصوير والنتائج والمتابعة بعناية.")}>Photography, results, and follow-up are handled carefully.</span></div>
    </section>

    <section class="image-text">
      <img src="/samples/clinic/media/team.jpg" alt="Aster Clinic medical team">
      <div>
        <p class="kicker" ${tx("Clinical team", "الفريق الطبي")}>Clinical team</p>
        <h2 ${tx("A clinical team, not a rushed treatment menu.", "فريق طبي، وليس قائمة علاجات مستعجلة.")}>A clinical team, not a rushed treatment menu.</h2>
        <p ${tx("Patients are guided through what matters: who is treating them, what the treatment involves, what recovery can look like, and whether a procedure is suitable at all.", "يتم توجيه المرضى بوضوح: من سيعالجهم، ماذا يتضمن العلاج، كيف يبدو التعافي، وهل الإجراء مناسب أصلاً.")}>Patients are guided through what matters: who is treating them, what the treatment involves, what recovery can look like, and whether a procedure is suitable at all.</p>
        <a class="text-link" href="/samples/clinic/doctors/index.html" ${tx("Meet the team", "تعرف على الفريق")}>Meet the team</a>
      </div>
    </section>

    <section class="section">
      <div class="section-top">
        <div>
          <p class="kicker" ${tx("Treatments", "العلاجات")}>Treatments</p>
          <h2 ${tx("Clear paths of care.", "مسارات رعاية واضحة.")}>Clear paths of care.</h2>
        </div>
        <a class="text-link" href="/samples/clinic/services/index.html" ${tx("All treatments", "كل العلاجات")}>All treatments</a>
      </div>
      <div class="card-grid">${treatmentCards}</div>
    </section>

    <section class="result-feature">
      <div>
        <p class="kicker" ${tx("Results", "النتائج")}>Results</p>
        <h2 ${tx("Matched photography. Realistic expectations.", "تصوير متطابق. توقعات واقعية.")}>Matched photography. Realistic expectations.</h2>
        <p ${tx("Results are shown with consistent angle, lighting, and timing so patients can understand outcomes responsibly.", "تُعرض النتائج بزوايا وإضاءة وتوقيت متسق حتى يفهم المرضى النتائج بمسؤولية.")}>Results are shown with consistent angle, lighting, and timing so patients can understand outcomes responsibly.</p>
        <a class="text-link" href="/samples/clinic/portfolio/index.html" ${tx("View result approach", "شاهد طريقة عرض النتائج")}>View result approach</a>
      </div>
      <div class="result-preview-grid">${resultPreviewCards}</div>
    </section>
    ${consultCta()}`,
  });
}

function consultCta() {
  return `<section class="consult-cta">
    <p class="kicker" ${tx("Consultation", "الاستشارة")}>Consultation</p>
    <h2 ${tx("Start with a private assessment.", "ابدأ بتقييم خاص.")}>Start with a private assessment.</h2>
    <a class="button light" href="/samples/clinic/book/index.html" ${tx("Book consultation", "احجز استشارة")}>Book consultation</a>
  </section>`;
}

function services() {
  page({
    route: "services",
    title: "Treatments",
    titleAr: "العلاجات",
    description: "Clear medical information, suitability, recovery notes, and consultation paths.",
    descriptionAr: "معلومات طبية واضحة عن الملاءمة، التعافي، ومسار الاستشارة.",
    body: `<section class="section tight">
      <div class="card-grid two">${treatmentCards}</div>
    </section>
    <section class="image-text reverse">
      <img src="/samples/clinic/media/interior.jpg" alt="Private clinic treatment corridor">
      <div>
        <p class="kicker" ${tx("How care is planned", "كيف تُخطط الرعاية")}>How care is planned</p>
        <h2 ${tx("No pressure. No menu of promises.", "من دون ضغط. ومن دون وعود جاهزة.")}>No pressure. No menu of promises.</h2>
        <p ${tx("Each treatment page is written to explain suitability, preparation, downtime, alternatives, and when a doctor should advise against treatment.", "كل صفحة علاج تشرح الملاءمة، التحضير، فترة التعافي، البدائل، ومتى قد ينصح الطبيب بعدم إجراء العلاج.")}>Each treatment page is written to explain suitability, preparation, downtime, alternatives, and when a doctor should advise against treatment.</p>
        <ul class="check-list">
          <li ${tx("Consultation before recommendation", "استشارة قبل أي توصية")}>Consultation before recommendation</li>
          <li ${tx("Evidence-based patient information", "معلومات مبنية على الأدلة")}>Evidence-based patient information</li>
          <li ${tx("Aftercare and follow-up built into the path", "رعاية لاحقة ومتابعة ضمن المسار")}>Aftercare and follow-up built into the path</li>
        </ul>
      </div>
    </section>
    ${consultCta()}`,
  });
}

function portfolio() {
  page({
    route: "portfolio",
    title: "Results",
    titleAr: "النتائج",
    description: "A responsible result library with matched photography and clear clinical notes.",
    descriptionAr: "معرض نتائج مسؤول بتصوير متطابق وملاحظات سريرية واضحة.",
    body: `${resultCaseSections}
    <section class="section tight">
      <div class="card-grid three">
        <article class="quiet-card"><h3 ${tx("Consent", "الموافقة")}>Consent</h3><p ${tx("Images are used only with documented permission and clear treatment context.", "تُستخدم الصور فقط بموافقة موثقة وسياق علاجي واضح.")}>Images are used only with documented permission and clear treatment context.</p></article>
        <article class="quiet-card"><h3 ${tx("Consistency", "الاتساق")}>Consistency</h3><p ${tx("Angles, lighting, makeup, and timing are controlled to avoid misleading results.", "تُضبط الزوايا والإضاءة والتوقيت لتجنب أي عرض مضلل.")}>Angles, lighting, makeup, and timing are controlled to avoid misleading results.</p></article>
        <article class="quiet-card"><h3 ${tx("Expectation", "التوقع")}>Expectation</h3><p ${tx("Every result is individual. Consultation explains what is realistic and safe.", "كل نتيجة فردية. الاستشارة توضح ما هو واقعي وآمن.")}>Every result is individual. Consultation explains what is realistic and safe.</p></article>
      </div>
    </section>
    ${consultCta()}`,
  });
}

function doctorsPage() {
  page({
    route: "doctors",
    title: "Doctors",
    titleAr: "الأطباء",
    description: "A small clinical team with clear roles and a restrained, patient-first approach.",
    descriptionAr: "فريق طبي صغير بأدوار واضحة ونهج هادئ يضع المريض أولاً.",
    body: `<section class="image-text">
      <img src="/samples/clinic/media/team.jpg" alt="Aster Clinic doctors and nurse practitioner">
      <div>
        <p class="kicker" ${tx("Team", "الفريق")}>Team</p>
        <h2 ${tx("The person you meet matters as much as the treatment.", "الشخص الذي تلتقيه مهم بقدر العلاج نفسه.")}>The person you meet matters as much as the treatment.</h2>
        <p ${tx("Profiles explain clinical focus, patient approach, and when each practitioner is involved in care.", "توضح الملفات التخصص، أسلوب التعامل مع المريض، ومتى يشارك كل مختص في الرعاية.")}>Profiles explain clinical focus, patient approach, and when each practitioner is involved in care.</p>
      </div>
    </section>
    <section class="section tight">
      <div class="doctor-grid">${doctorCards}</div>
    </section>`,
  });
}

function patientInfo() {
  page({
    route: "patient-info",
    title: "Patient information",
    titleAr: "إرشادات المرضى",
    description: "Plain preparation, recovery, safety, and follow-up guidance.",
    descriptionAr: "إرشادات واضحة للتحضير، التعافي، السلامة، والمتابعة.",
    body: `<section class="section tight">
      <div class="card-grid two">
        <article class="quiet-card"><h3 ${tx("Before consultation", "قبل الاستشارة")}>Before consultation</h3><p ${tx("Bring your history, current medication, previous procedures, allergies, and goals. The first appointment is for assessment, not pressure.", "أحضر تاريخك الطبي، أدويتك الحالية، الإجراءات السابقة، الحساسية، وأهدافك. الموعد الأول للتقييم وليس للضغط.")}>Bring your history, current medication, previous procedures, allergies, and goals. The first appointment is for assessment, not pressure.</p></article>
        <article class="quiet-card"><h3 ${tx("Before treatment", "قبل العلاج")}>Before treatment</h3><p ${tx("Preparation notes are specific to treatment type and may include medication guidance, skincare pauses, and recovery planning.", "تعليمات التحضير تختلف حسب العلاج وقد تشمل إرشادات للأدوية، إيقاف بعض منتجات البشرة، وخطة للتعافي.")}>Preparation notes are specific to treatment type and may include medication guidance, skincare pauses, and recovery planning.</p></article>
        <article class="quiet-card"><h3 ${tx("After treatment", "بعد العلاج")}>After treatment</h3><p ${tx("Patients receive written aftercare, expected recovery signs, and clear instructions for urgent concerns.", "يحصل المرضى على تعليمات مكتوبة للرعاية اللاحقة، علامات التعافي المتوقعة، وإرشادات واضحة عند وجود أي قلق عاجل.")}>Patients receive written aftercare, expected recovery signs, and clear instructions for urgent concerns.</p></article>
        <article class="quiet-card"><h3 ${tx("Follow-up", "المتابعة")}>Follow-up</h3><p ${tx("Review appointments document healing, answer questions, and decide whether refinement is appropriate.", "توثق مواعيد المراجعة التعافي، تجيب على الأسئلة، وتحدد ما إذا كان أي تحسين إضافي مناسباً.")}>Review appointments document healing, answer questions, and decide whether refinement is appropriate.</p></article>
      </div>
    </section>`,
  });
}

function contact() {
  page({
    route: "contact",
    title: "Contact",
    titleAr: "التواصل",
    description: "Speak with the clinic or book a private consultation.",
    descriptionAr: "تواصل مع العيادة أو احجز استشارة خاصة.",
    body: `<section class="contact-panel">
      <div>
        <p class="kicker" ${tx("Aster Clinic", "عيادة أستر")}>Aster Clinic</p>
        <h2 ${tx("Abdoun, Amman", "عبدون، عمّان")}>Abdoun, Amman</h2>
        <p ${tx("Sunday to Thursday, 9:00 - 18:00", "الأحد إلى الخميس، 9:00 - 18:00")}>Sunday to Thursday, 9:00 - 18:00</p>
      </div>
      <div class="contact-links">
        <a href="tel:+962798509111">+962 79 850 9111</a>
        <a href="mailto:care@asterclinic.com">care@asterclinic.com</a>
        <a class="button" href="/samples/clinic/book/index.html" ${tx("Book consultation", "احجز استشارة")}>Book consultation</a>
      </div>
    </section>`,
  });
}

function book() {
  page({
    route: "book",
    title: "Book consultation",
    titleAr: "احجز استشارة",
    description: "Request a private consultation with the Aster Clinic team.",
    descriptionAr: "اطلب استشارة خاصة مع فريق عيادة أستر.",
    body: `<section class="booking-layout">
      <form class="booking-form">
        <label><span ${tx("Name", "الاسم")}>Name</span><input name="name" autocomplete="name" required></label>
        <label><span ${tx("Phone", "الهاتف")}>Phone</span><input name="phone" autocomplete="tel" required></label>
        <label><span ${tx("Interest", "الاهتمام")}>Interest</span><select name="interest"><option ${tx("Facial surgery consultation", "استشارة جراحة الوجه")}>Facial surgery consultation</option><option ${tx("Skin health", "صحة البشرة")}>Skin health</option><option ${tx("Injectables", "الحقن التجميلية")}>Injectables</option><option ${tx("Not sure yet", "لست متأكداً بعد")}>Not sure yet</option></select></label>
        <label><span ${tx("Preferred day", "اليوم المفضل")}>Preferred day</span><select name="day"><option ${tx("Sunday", "الأحد")}>Sunday</option><option ${tx("Monday", "الاثنين")}>Monday</option><option ${tx("Tuesday", "الثلاثاء")}>Tuesday</option><option ${tx("Wednesday", "الأربعاء")}>Wednesday</option><option ${tx("Thursday", "الخميس")}>Thursday</option></select></label>
        <label class="full"><span ${tx("Message", "الرسالة")}>Message</span><textarea name="message" rows="5" data-placeholder-en="Tell us what you would like to discuss." data-placeholder-ar="اكتب ما ترغب في مناقشته." placeholder="Tell us what you would like to discuss."></textarea></label>
        <button class="button full" type="submit" ${tx("Request consultation", "اطلب الاستشارة")}>Request consultation</button>
        <p class="form-note" hidden ${tx("Thank you. The clinic will contact you to confirm the appointment.", "شكراً لك. ستتواصل العيادة معك لتأكيد الموعد.")}>Thank you. The clinic will contact you to confirm the appointment.</p>
      </form>
      <img src="/samples/clinic/media/interior.jpg" alt="Aster Clinic private reception">
    </section>`,
  });
}

function about() {
  page({
    route: "about",
    title: "About Aster",
    titleAr: "عن أستر",
    description: "A quiet private clinic built around clarity, privacy, and measured care.",
    descriptionAr: "عيادة خاصة هادئة مبنية على الوضوح والخصوصية والرعاية المدروسة.",
    body: `<section class="image-text">
      <img src="/samples/clinic/media/interior.jpg" alt="Aster Clinic interior">
      <div>
        <p class="kicker" ${tx("Definition", "التعريف")}>Definition</p>
        <h2 ${tx("Care that feels clear before it feels cosmetic.", "رعاية تبدو واضحة قبل أن تبدو تجميلية.")}>Care that feels clear before it feels cosmetic.</h2>
        <p ${tx("Aster Clinic is designed for patients who want careful information, subtle outcomes, and a clinical team that explains the full path before treatment begins.", "صُممت عيادة أستر للمرضى الذين يريدون معلومات دقيقة، نتائج هادئة، وفريقاً طبياً يشرح المسار كاملاً قبل بدء العلاج.")}>Aster Clinic is designed for patients who want careful information, subtle outcomes, and a clinical team that explains the full path before treatment begins.</p>
      </div>
    </section>`,
  });
}

function standards() {
  page({
    route: "case-study",
    title: "Clinical standards",
    titleAr: "المعايير السريرية",
    description: "How Aster presents information, photography, consent, and follow-up.",
    descriptionAr: "كيف تعرض أستر المعلومات، التصوير، الموافقة، والمتابعة.",
    body: `<section class="section tight">
      <div class="card-grid two">
        <article class="quiet-card"><h3 ${tx("Information", "المعلومات")}>Information</h3><p ${tx("Treatment information is written plainly, with suitability, risks, recovery, and alternatives kept visible.", "تُكتب معلومات العلاج بوضوح مع إبقاء الملاءمة والمخاطر والتعافي والبدائل ظاهرة.")}>Treatment information is written plainly, with suitability, risks, recovery, and alternatives kept visible.</p></article>
        <article class="quiet-card"><h3 ${tx("Photography", "التصوير")}>Photography</h3><p ${tx("Result photography is consent-led and matched for angle, light, timing, and context.", "تصوير النتائج يتم بموافقة واضحة وبزوايا وإضاءة وتوقيت وسياق متسق.")}>Result photography is consent-led and matched for angle, light, timing, and context.</p></article>
        <article class="quiet-card"><h3 ${tx("Privacy", "الخصوصية")}>Privacy</h3><p ${tx("Patient information and imagery are handled with clear consent and minimal exposure.", "تُعامل معلومات وصور المرضى بموافقة واضحة وبأقل قدر ممكن من الظهور.")}>Patient information and imagery are handled with clear consent and minimal exposure.</p></article>
        <article class="quiet-card"><h3 ${tx("Follow-up", "المتابعة")}>Follow-up</h3><p ${tx("Care continues after treatment with review appointments and written aftercare.", "تستمر الرعاية بعد العلاج عبر مواعيد مراجعة وتعليمات مكتوبة.")}>Care continues after treatment with review appointments and written aftercare.</p></article>
      </div>
    </section>`,
  });
}

const css = `@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap");

:root {
  --ink: #20211e;
  --muted: #686d64;
  --paper: #f8f5ee;
  --surface: #fffdf8;
  --stone: #ded8ca;
  --line: rgba(32, 33, 30, 0.12);
  --sage: #768071;
  --moss: #354139;
  --warm: #b49a75;
}

* { box-sizing: border-box; }
html { overflow-x: hidden; background: var(--paper); scroll-behavior: smooth; }
body {
  margin: 0;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  background: var(--paper);
  color: var(--ink);
  font-family: Geist, "Avenir Next", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.65;
  text-rendering: optimizeLegibility;
}

html[dir="rtl"] body {
  font-family: "Noto Sans Arabic", Geist, ui-sans-serif, system-ui, sans-serif;
}

a { color: inherit; text-decoration: none; }
img { display: block; width: 100%; height: auto; }
button, input, select, textarea { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
:focus-visible { outline: 3px solid rgba(180, 154, 117, 0.55); outline-offset: 3px; }

.skip-link {
  position: fixed;
  left: 16px;
  top: 16px;
  z-index: 100;
  transform: translateY(-180%);
  background: var(--ink);
  color: white;
  padding: 10px 14px;
}
.skip-link:focus { transform: translateY(0); }

.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  padding: 0 clamp(18px, 4vw, 48px);
  border-bottom: 1px solid var(--line);
  background: rgba(248, 245, 238, 0.9);
  backdrop-filter: blur(16px);
}

.brand {
  display: inline-flex;
  flex-direction: column;
  gap: 0;
}
.brand span {
  color: var(--ink);
  font-size: 1rem;
  font-weight: 700;
}
.brand small {
  color: var(--muted);
  font-size: 0.76rem;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: clamp(18px, 2.5vw, 34px);
  color: var(--muted);
  font-size: 0.84rem;
  font-weight: 600;
}
.desktop-nav a {
  display: inline-flex;
  align-items: center;
  min-height: 72px;
  border-bottom: 1px solid transparent;
}
.desktop-nav a:hover,
.desktop-nav a.active {
  color: var(--ink);
  border-color: var(--warm);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.book-link {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0 18px;
  font-size: 0.84rem;
  font-weight: 700;
}
.language-toggle {
  min-height: 42px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  padding: 0 14px;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
}
.language-toggle:hover,
.book-link:hover {
  border-color: var(--warm);
}
.mobile-language {
  width: 100%;
  justify-content: center;
}
.menu-button {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--ink);
}
.menu-button span,
.menu-button::before,
.menu-button::after {
  display: block;
  width: 17px;
  height: 1px;
  margin: 0 auto;
  background: currentColor;
  content: "";
}
.menu-button span { margin-block: 5px; }

.mobile-nav {
  position: fixed;
  inset: 72px 0 auto;
  z-index: 25;
  display: none;
  gap: 10px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
  padding: 18px;
}
.mobile-nav.open { display: grid; }
.mobile-nav a:not(.button) {
  border-bottom: 1px solid var(--line);
  padding: 12px 0;
  font-weight: 600;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border: 1px solid var(--moss);
  border-radius: 999px;
  background: var(--moss);
  color: white;
  padding: 0 22px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
}
.button.ghost {
  background: transparent;
  color: var(--ink);
  border-color: var(--line);
}
.button.light {
  background: var(--surface);
  color: var(--ink);
  border-color: var(--surface);
}
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.kicker {
  margin: 0 0 12px;
  color: var(--sage);
  font-size: 0.84rem;
  font-weight: 700;
}

h1, h2, h3, p { margin-top: 0; }
h1, h2, h3 {
  color: var(--ink);
  line-height: 1.12;
  letter-spacing: 0;
  overflow-wrap: break-word;
}
h1 {
  max-width: 780px;
  font-size: clamp(2.2rem, 4.4vw, 4.35rem);
  font-weight: 550;
}
h2 {
  max-width: 700px;
  font-size: clamp(1.68rem, 3vw, 3rem);
  font-weight: 550;
}
h3 {
  font-size: 1.08rem;
  font-weight: 650;
}
p { color: var(--muted); }

.hero {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(420px, 1fr);
  gap: clamp(32px, 6vw, 84px);
  align-items: center;
  min-height: calc(100svh - 72px);
  padding: clamp(56px, 8vw, 112px) clamp(18px, 4vw, 48px);
}
.hero-copy p:not(.kicker) {
  max-width: 560px;
  font-size: clamp(1.02rem, 1.4vw, 1.18rem);
}
.hero-image {
  margin: 0;
  overflow: hidden;
  border-radius: 8px;
  background: var(--stone);
}
.hero-image img {
  aspect-ratio: 1.08 / 1;
  object-fit: cover;
}

.trust-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-block: 1px solid var(--line);
  background: rgba(255, 253, 248, 0.48);
}
.trust-strip div {
  min-height: 128px;
  border-right: 1px solid var(--line);
  padding: clamp(22px, 4vw, 38px);
}
.trust-strip div:last-child { border-right: 0; }
.trust-strip strong {
  display: block;
  margin-bottom: 6px;
  font-weight: 650;
}
.trust-strip span { color: var(--muted); }

.page-lead {
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(34px, 5vw, 58px) clamp(18px, 4vw, 48px) clamp(10px, 2vw, 20px);
}
.page-lead h1 {
  max-width: 760px;
  margin-bottom: 16px;
  font-size: clamp(1.95rem, 3.4vw, 3.2rem);
}
.page-lead p:not(.kicker) {
  max-width: 640px;
  font-size: 1.04rem;
}

.section,
.image-text,
.result-feature,
.result-case,
.booking-layout,
.contact-panel {
  padding: clamp(54px, 8vw, 104px) clamp(18px, 4vw, 48px);
}
.page-lead + .section,
.page-lead + .image-text,
.page-lead + .result-case,
.page-lead + .booking-layout,
.page-lead + .contact-panel {
  padding-top: clamp(18px, 3vw, 34px);
}
.section.tight { padding-top: clamp(28px, 5vw, 56px); }
.section-top {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}
.text-link {
  display: inline-flex;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 5px;
  color: var(--ink);
  font-weight: 700;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}
.card-grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.card-grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.quiet-card {
  min-height: 230px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  padding: 24px;
}
.quiet-card p { margin-bottom: 20px; }
.quiet-card a,
.doctor-item span {
  color: var(--ink);
  font-size: 0.88rem;
  font-weight: 700;
}

.doctor-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.doctor-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.doctor-card img {
  aspect-ratio: 1 / 1.22;
  object-fit: cover;
  object-position: center top;
}

.doctor-card div {
  padding: 22px;
}

.doctor-card p {
  margin-bottom: 8px;
}

.doctor-card span {
  color: var(--ink);
  font-size: 0.88rem;
  font-weight: 700;
}

.image-text,
.result-feature,
.result-case,
.booking-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.86fr);
  gap: clamp(30px, 6vw, 86px);
  align-items: center;
}
.image-text.reverse img { order: 2; }
.image-text img,
.result-feature img,
.result-case img,
.booking-layout img {
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 1.15 / 1;
  object-fit: cover;
  background: var(--stone);
}
.result-feature {
  background: #eeebe3;
}
.result-preview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.result-tile {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}
.result-tile img {
  aspect-ratio: 1.1 / 0.86;
  object-fit: cover;
}
.result-tile div {
  padding: 18px;
}
.result-tile h3 {
  margin-bottom: 0;
}
.result-case img {
  aspect-ratio: 1.45 / 1;
}

.result-case + .result-case {
  padding-top: 0;
}

.check-list {
  display: grid;
  gap: 10px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}
.check-list li {
  border-top: 1px solid var(--line);
  padding-top: 12px;
  color: var(--ink);
  font-weight: 600;
}

.case-notes {
  display: grid;
  gap: 14px;
  margin: 24px 0 0;
}
.case-notes div {
  border-top: 1px solid var(--line);
  padding-top: 14px;
}
.case-notes dt {
  color: var(--ink);
  font-weight: 700;
}
.case-notes dd {
  margin: 2px 0 0;
  color: var(--muted);
}

.contact-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
  max-width: 1180px;
  margin: 0 auto;
}
.contact-links {
  display: grid;
  gap: 12px;
}
.contact-links a:not(.button) {
  border-bottom: 1px solid var(--line);
  padding: 12px 0;
  color: var(--ink);
  font-size: clamp(1.15rem, 2vw, 1.6rem);
  font-weight: 600;
}

.booking-layout {
  align-items: start;
}
.booking-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.booking-form label {
  display: grid;
  gap: 8px;
}
.booking-form span {
  color: var(--ink);
  font-size: 0.84rem;
  font-weight: 700;
}
.booking-form input,
.booking-form select,
.booking-form textarea {
  width: 100%;
  min-height: 52px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  padding: 12px 14px;
}
.booking-form .full,
.booking-form button,
.form-note { grid-column: 1 / -1; }
.form-note {
  margin: 0;
  border-radius: 8px;
  background: #e9eee5;
  color: var(--ink);
  padding: 14px;
}

.consult-cta {
  margin: clamp(18px, 4vw, 48px);
  border-radius: 8px;
  background: var(--moss);
  color: white;
  padding: clamp(34px, 5vw, 58px);
}
.consult-cta h2,
.consult-cta .kicker { color: white; }
.consult-cta h2 { margin-bottom: 20px; }

.footer {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: clamp(24px, 5vw, 72px);
  background: #20211e;
  color: white;
  padding: clamp(42px, 6vw, 72px) clamp(18px, 4vw, 48px) 94px;
}
.footer p,
.footer a,
.footer span,
.footer small { color: rgba(255, 255, 255, 0.68); }
.footer a,
.footer span { display: block; margin-bottom: 8px; }
.footer-brand span { color: white; }

.mobile-cta { display: none; }

html[dir="rtl"] .desktop-nav a,
html[dir="rtl"] .button,
html[dir="rtl"] .book-link,
html[dir="rtl"] .language-toggle {
  letter-spacing: 0;
}

html[dir="rtl"] .case-notes dd {
  margin-right: 0;
}

html[dir="rtl"] .page-lead,
html[dir="rtl"] .hero-copy,
html[dir="rtl"] .image-text div,
html[dir="rtl"] .result-feature > div,
html[dir="rtl"] .result-case > div,
html[dir="rtl"] .contact-panel,
html[dir="rtl"] .booking-form,
html[dir="rtl"] .quiet-card,
html[dir="rtl"] .doctor-card div,
html[dir="rtl"] .footer {
  text-align: right;
}

@media (max-width: 1040px) {
  .desktop-nav { display: none; }
  .menu-button { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; }
  .hero,
  .image-text,
  .result-feature,
  .result-case,
  .booking-layout,
  .contact-panel,
  .footer {
    grid-template-columns: 1fr;
  }
  .hero {
    min-height: auto;
  }
  .hero-image img {
    aspect-ratio: 1.25 / 1;
  }
  .image-text.reverse img { order: 0; }
  .card-grid,
  .card-grid.two,
  .card-grid.three,
  .doctor-grid,
  .result-preview-grid,
  .trust-strip {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  body { padding-bottom: 72px; }
  .site-header {
    min-height: 66px;
    padding-inline: 16px;
  }
  html[dir="rtl"] .site-header,
  html[dir="rtl"] .mobile-cta {
    direction: ltr;
  }
  html[dir="rtl"] .site-header .brand,
  html[dir="rtl"] .mobile-cta a {
    direction: rtl;
  }
  .brand small,
  .book-link,
  .header-actions > .language-toggle { display: none; }
  .mobile-nav { inset-block-start: 66px; }
  h1 { font-size: clamp(2rem, 8.6vw, 2.68rem); line-height: 1.14; }
  h2 { font-size: clamp(1.65rem, 8vw, 2.35rem); }
  html[dir="rtl"] h1 { font-size: clamp(1.82rem, 7.4vw, 2.24rem); line-height: 1.22; }
  html[dir="rtl"] h2 { font-size: clamp(1.5rem, 7vw, 2.05rem); line-height: 1.26; }
  .hero,
  .section,
  .image-text,
  .result-feature,
  .result-case,
  .booking-layout,
  .contact-panel {
    padding-inline: 16px;
  }
  .hero {
    display: block;
    gap: 28px;
    padding-top: 40px;
  }
  .hero-copy,
  .hero-image {
    width: 100%;
    max-width: min(358px, calc(100vw - 32px));
  }
  html[dir="rtl"] .hero-copy,
  html[dir="rtl"] .hero-image {
    margin-inline: auto 0;
  }
  .hero-copy {
    margin-bottom: 28px;
  }
  .button-row,
  .booking-form,
  .card-grid,
  .card-grid.two,
  .card-grid.three,
  .doctor-grid,
  .result-preview-grid,
  .trust-strip {
    grid-template-columns: 1fr;
  }
  .button-row { display: grid; }
  .button { width: 100%; }
  .trust-strip div {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  .quiet-card {
    min-height: auto;
    padding: 22px;
  }
  .hero-image img,
  .image-text img,
  .result-feature img,
  .result-case img,
  .booking-layout img {
    aspect-ratio: 1 / 0.92;
  }
  .section-top {
    align-items: flex-start;
    flex-direction: column;
  }
  .mobile-cta {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    display: grid;
    box-sizing: border-box;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 8px;
    width: 100%;
    max-width: 100vw;
    border-top: 1px solid var(--line);
    background: var(--surface);
    padding: 8px;
  }
  .mobile-cta a {
    display: flex;
    min-width: 0;
    width: 100%;
    padding-inline: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
`;

const js = `const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
menuButton?.addEventListener("click", () => {
  const open = mobileNav?.classList.toggle("open") ?? false;
  menuButton.setAttribute("aria-expanded", String(open));
});

const languageButtons = document.querySelectorAll("[data-language-toggle]");
const translatable = document.querySelectorAll("[data-en][data-ar]");
const placeholderFields = document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]");

function applyLanguage(language) {
  const isArabic = language === "ar";
  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";

  translatable.forEach((element) => {
    element.textContent = element.dataset[isArabic ? "ar" : "en"] || "";
  });

  placeholderFields.forEach((field) => {
    field.setAttribute("placeholder", field.dataset[isArabic ? "placeholderAr" : "placeholderEn"] || "");
  });

  languageButtons.forEach((button) => {
    button.textContent = isArabic ? "English" : "عربي";
    button.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
  });

  localStorage.setItem("aster-language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
  });
});

const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
applyLanguage(requestedLanguage === "ar" || localStorage.getItem("aster-language") === "ar" ? "ar" : "en");

document.querySelector(".booking-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector(".form-note")?.removeAttribute("hidden");
});
`;

rmSync(target, { recursive: true, force: true });
ensureDir(target);
cpSync(assetSource, path.join(target, "media"), { recursive: true });
writeFileSync(path.join(target, "aster.css"), css);
writeFileSync(path.join(target, "aster.js"), js);

home();
services();
portfolio();
doctorsPage();
patientInfo();
contact();
book();
about();
standards();

console.log(`Rebuilt calmer clinic sample at ${target}`);
