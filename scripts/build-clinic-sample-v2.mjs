import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "samples", "clinic");

const routes = [
  "index",
  "services",
  "portfolio",
  "doctors",
  "book",
  "contact",
  "about",
  "patient-info",
  "case-study",
];

const image = {
  hero: "https://images.unsplash.com/photo-1761819922656-d1b77eef49c0?auto=format&fit=crop&w=1800&q=84",
  face: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1500&q=84",
  consult: "https://images.unsplash.com/photo-1713085085470-fba013d67e65?auto=format&fit=crop&w=1500&q=84",
  skin: "https://images.unsplash.com/photo-1761718209852-54ca4210183e?auto=format&fit=crop&w=1500&q=84",
  room: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1500&q=84",
  doctorA: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=84",
  doctorB: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=1200&q=84",
  doctorC: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=84",
  resultA: "https://images.unsplash.com/photo-1761819922656-d1b77eef49c0?auto=format&fit=crop&w=1200&q=84",
  resultB: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1200&q=84",
  resultC: "https://images.unsplash.com/photo-1761718209708-9ab9ba1c7252?auto=format&fit=crop&w=1200&q=84",
  resultD: "https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?auto=format&fit=crop&w=1200&q=84",
};

const nav = [
  ["index", "Home"],
  ["services", "Treatments"],
  ["portfolio", "Results"],
  ["doctors", "Doctors"],
  ["contact", "Contact"],
];

const treatments = [
  {
    name: "Facial Plastic Surgery",
    copy: "Consultations for rhinoplasty, eyelid refinement, facial balance, and natural-looking surgical plans.",
    tag: "Surgical",
  },
  {
    name: "Injectables & Contouring",
    copy: "Subtle Botox, filler, profile balancing, and non-surgical contouring with conservative treatment plans.",
    tag: "Non-surgical",
  },
  {
    name: "Skin & Laser Treatments",
    copy: "Texture, pigmentation, acne scarring, resurfacing, and maintenance plans built around skin health.",
    tag: "Skin",
  },
  {
    name: "Post-treatment Care",
    copy: "Follow-up appointments, recovery guidance, photography review, and long-term care recommendations.",
    tag: "Aftercare",
  },
];

const doctors = [
  [
    "Dr. Lina Haddad",
    "Facial Plastic Surgeon",
    image.doctorA,
    "Facial aesthetics, rhinoplasty consultation, eyelid procedures, and patient-specific surgical planning.",
  ],
  [
    "Dr. Omar Khalil",
    "Aesthetic Dermatology",
    image.doctorB,
    "Skin quality, injectables, laser resurfacing, acne scarring, and combination treatment plans.",
  ],
  [
    "Dr. Rania Nasser",
    "Clinical Aesthetics",
    image.doctorC,
    "Non-surgical contouring, facial balancing, pre-treatment education, and structured aftercare.",
  ],
];

const results = [
  ["Profile Refinement", "Rhinoplasty planning", "Facial proportion, breathing goals, and conservative profile changes.", image.resultA],
  ["Skin Texture", "Laser + skincare", "Texture, tone, and maintenance planning photographed over a treatment cycle.", image.resultB],
  ["Facial Balance", "Injectables", "Subtle contouring around the midface, lips, and chin without overcorrection.", image.resultC],
  ["Recovery Review", "Post-treatment", "Follow-up photography and physician review to monitor healing and patient comfort.", image.resultD],
];

function href(route) {
  return route === "index" ? "/samples/clinic/index.html" : `/samples/clinic/${route}/index.html`;
}

function icon(name) {
  const common = 'aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"';
  const paths = {
    arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
    calendar: '<rect x="3.5" y="4.5" width="17" height="16" rx="2"></rect><path d="M8 2.75v4M16 2.75v4M3.5 10h17"></path>',
    phone: '<path d="M22 16.92v2.3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h2.3a2 2 0 0 1 2 1.72c.11.83.3 1.64.56 2.42a2 2 0 0 1-.45 2.11L7.6 9.17a15.7 15.7 0 0 0 7.23 7.23l.92-.92a2 2 0 0 1 2.11-.45c.78.26 1.59.45 2.42.56A2 2 0 0 1 22 16.92z"></path>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"></path>',
    check: '<path d="m5 12 4 4L19 6"></path>',
    plus: '<path d="M12 5v14M5 12h14"></path>',
  };
  return `<svg ${common}>${paths[name]}</svg>`;
}

function activeRoute(route) {
  if (route === "about" || route === "patient-info" || route === "case-study") return "index";
  return route;
}

function shell(route, title, content, options = {}) {
  const active = activeRoute(route);
  const cta = options.hideCta
    ? ""
    : `<section class="cta-strip">
      <div class="shell cta-inner">
        <div>
          <span class="eyebrow">Private consultation</span>
          <h2>Speak with the clinic before choosing a treatment.</h2>
        </div>
        <div class="actions">
          <a class="button button-light" href="${href("book")}">${icon("calendar")}Book consultation</a>
          <a class="button button-ghost-light" href="tel:+96265550184">${icon("phone")}Call reception</a>
        </div>
      </div>
    </section>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} - Aster Clinic</title>
  <meta name="description" content="Aster Clinic is a private aesthetic clinic in Abdoun, Amman for facial plastic surgery consultation, skin treatments, injectables, and follow-up care.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="stylesheet" href="/samples/clinic/clinic-v2.css">
  <script defer src="/samples/clinic/clinic-v2.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="topbar">
    <div class="shell nav-shell">
      <a class="brand" href="${href("index")}" aria-label="Aster Clinic home">
        <span class="brand-mark">AC</span>
        <span>Aster Clinic</span>
      </a>
      <nav class="nav-links" aria-label="Primary navigation">
        ${nav.map(([key, label]) => `<a class="${active === key ? "active" : ""}" href="${href(key)}">${label}</a>`).join("")}
      </nav>
      <div class="nav-actions">
        <a class="phone-link" href="tel:+96265550184">+962 6 555 0184</a>
        <a class="button button-small" href="${href("book")}">Book</a>
        <button class="menu-button" type="button" data-menu-toggle aria-label="Open menu">${icon("menu")}</button>
      </div>
    </div>
    <nav class="mobile-menu" data-mobile-nav aria-label="Mobile navigation">
      ${nav.map(([key, label]) => `<a href="${href(key)}">${label}</a>`).join("")}
      <a href="${href("book")}">Book consultation</a>
    </nav>
  </header>
  <main id="main">${content}${cta}</main>
  <footer class="footer">
    <div class="shell footer-grid">
      <div>
        <a class="brand footer-brand" href="${href("index")}"><span class="brand-mark">AC</span><span>Aster Clinic</span></a>
        <p>Private aesthetic medicine in Abdoun, Amman.</p>
      </div>
      <div><h2>Hours</h2><p>Sunday-Thursday<br>9:00 AM-6:00 PM</p></div>
      <div><h2>Contact</h2><a href="tel:+96265550184">+962 6 555 0184</a><a href="mailto:hello@asterclinic.jo">hello@asterclinic.jo</a></div>
      <div><h2>Address</h2><p>14 Al-Kindi Street<br>Abdoun, Amman</p></div>
    </div>
  </footer>
  <div class="mobile-cta"><a class="button button-soft" href="tel:+96265550184">Call</a><a class="button" href="${href("book")}">Book</a></div>
</body>
</html>`;
}

function srTitle(text) {
  return `<h1 class="sr-only">${text}</h1>`;
}

function treatmentCards() {
  return treatments.map((item) => `<article class="treatment-card">
    <span>${item.tag}</span>
    <h2>${item.name}</h2>
    <p>${item.copy}</p>
    <a href="${href("book")}">Discuss treatment ${icon("arrow")}</a>
  </article>`).join("");
}

function resultCards(limit = results.length) {
  return results.slice(0, limit).map(([name, type, copy, img]) => `<article class="result-card">
    <img src="${img}" alt="${name} treatment photography">
    <div>
      <span>${type}</span>
      <h2>${name}</h2>
      <p>${copy}</p>
    </div>
  </article>`).join("");
}

const home = shell("index", "Private aesthetic clinic", `${srTitle("Aster Clinic")}
  <section class="hero shell">
    <div class="hero-copy">
      <span class="eyebrow">Private aesthetic clinic</span>
      <h2>Cosmetic care that feels precise, private, and modern.</h2>
      <p>Facial plastic surgery consultation, injectables, skin treatments, and recovery follow-up for patients who want measured, natural-looking results.</p>
      <div class="actions">
        <a class="button" href="${href("book")}">${icon("calendar")}Book consultation</a>
        <a class="button button-soft" href="${href("portfolio")}">View results</a>
      </div>
    </div>
    <div class="hero-gallery" aria-label="Clinic photography">
      <img class="hero-main" src="${image.hero}" alt="Modern aesthetic clinic treatment room">
      <img class="hero-inset" src="${image.face}" alt="Close-up aesthetic consultation photography">
    </div>
  </section>
  <section class="shell signal-row" aria-label="Clinic highlights">
    <div><span>01</span><strong>Consultation-led</strong><p>Treatment plans begin with assessment and expectations.</p></div>
    <div><span>02</span><strong>Natural outcomes</strong><p>Subtle proportion, skin quality, and long-term maintenance.</p></div>
    <div><span>03</span><strong>Follow-up care</strong><p>Recovery guidance and review appointments after treatment.</p></div>
  </section>
  <section class="shell image-section">
    <div>
      <span class="eyebrow">Treatments</span>
      <h2>Clinical services for facial aesthetics and skin health.</h2>
    </div>
    <div class="treatment-grid">${treatmentCards()}</div>
  </section>
  <section class="shell portfolio-preview">
    <div class="section-title">
      <span class="eyebrow">Results portfolio</span>
      <a href="${href("portfolio")}">Open gallery ${icon("arrow")}</a>
    </div>
    <div class="results-grid">${resultCards(3)}</div>
  </section>`);

const servicesPage = shell("services", "Treatments", `${srTitle("Treatments")}
  <section class="shell page-block">
    <div class="lead-copy">
      <span class="eyebrow">Treatments</span>
      <p>Explore consultation-led treatments for facial balance, skin quality, injectables, and recovery support.</p>
    </div>
    <div class="treatment-grid">${treatmentCards()}</div>
  </section>
  <section class="shell split-feature">
    <img src="${image.skin}" alt="Aesthetic skin treatment room detail">
    <div>
      <span class="eyebrow">Care planning</span>
      <h2>No overpromising. No rushed decisions.</h2>
      <p>The clinic frames each treatment through suitability, expected downtime, preparation, and realistic review timelines.</p>
      <ul class="check-list">
        <li>${icon("check")}Assessment before treatment</li>
        <li>${icon("check")}Photography when clinically useful</li>
        <li>${icon("check")}Written aftercare guidance</li>
      </ul>
    </div>
  </section>`);

const portfolioPage = shell("portfolio", "Results", `${srTitle("Results Portfolio")}
  <section class="shell page-block">
    <div class="lead-copy">
      <span class="eyebrow">Results</span>
      <p>Selected treatment journeys photographed with consent, reviewed by the clinical team, and presented with realistic expectations.</p>
    </div>
    <div class="portfolio-layout">
      <article class="comparison-panel">
        <div class="comparison-images">
          <figure>
            <img src="${image.resultA}" alt="Patient profile reference before planning">
            <figcaption>Before</figcaption>
          </figure>
          <figure>
            <img src="${image.face}" alt="Patient profile reference after treatment planning">
            <figcaption>After</figcaption>
          </figure>
        </div>
        <div>
          <span>Featured case</span>
          <h2>Profile refinement consultation</h2>
          <p>Before-and-after photography helps patients understand the planning process, recovery timeline, and the level of change that can be achieved with restraint.</p>
        </div>
      </article>
      <div class="results-grid">${resultCards()}</div>
    </div>
  </section>`);

const doctorsPage = shell("doctors", "Doctors", `${srTitle("Doctors")}
  <section class="shell page-block">
    <div class="lead-copy">
      <span class="eyebrow">Doctors</span>
      <p>Meet the physicians who lead consultations, treatment planning, and follow-up care at Aster Clinic.</p>
    </div>
    <div class="doctor-grid">
      ${doctors.map(([name, role, img, bio]) => `<article class="doctor-card">
        <img src="${img}" alt="${name}">
        <span>${role}</span>
        <h2>${name}</h2>
        <p>${bio}</p>
        <a href="${href("book")}">Book consultation ${icon("arrow")}</a>
      </article>`).join("")}
    </div>
  </section>`);

const bookPage = shell("book", "Book Consultation", `${srTitle("Book Consultation")}
  <section class="shell booking-page">
    <form class="booking-form" data-demo-form>
      <div class="lead-copy compact">
        <span class="eyebrow">Consultation request</span>
        <p>Choose the treatment area and preferred time. Reception confirms by phone.</p>
      </div>
      <div class="form-grid">
        <label>Full name<input required type="text" autocomplete="name"></label>
        <label>Phone number<input required type="tel" autocomplete="tel"></label>
        <label>Email<input type="email" autocomplete="email"></label>
        <label>Preferred date<input required type="date"></label>
        <label>Treatment area<select required><option value="">Select treatment</option>${treatments.map((item) => `<option>${item.name}</option>`).join("")}</select></label>
        <label>Doctor<select><option>First available</option>${doctors.map(([name]) => `<option>${name}</option>`).join("")}</select></label>
        <label class="full">Message<textarea rows="4" placeholder="Tell us what you would like to discuss."></textarea></label>
      </div>
      <button class="button submit" type="submit">${icon("calendar")}Request consultation</button>
      <p class="form-status" data-form-status hidden>Request received. Reception would call to confirm the appointment.</p>
    </form>
    <aside class="booking-side">
      <img src="${image.consult}" alt="Doctor consultation in a clinical office">
      <div>
        <span class="eyebrow">Reception</span>
        <h2>+962 6 555 0184</h2>
        <p>Sunday-Thursday, 9:00 AM-6:00 PM</p>
      </div>
    </aside>
  </section>`, { hideCta: true });

const contactPage = shell("contact", "Contact", `${srTitle("Contact")}
  <section class="shell contact-page">
    <div class="contact-panel">
      <span class="eyebrow">Contact</span>
      <a class="large-link" href="tel:+96265550184">+962 6 555 0184</a>
      <a class="large-link" href="mailto:hello@asterclinic.jo">hello@asterclinic.jo</a>
      <dl>
        <div><dt>Address</dt><dd>14 Al-Kindi Street, Abdoun, Amman</dd></div>
        <div><dt>Hours</dt><dd>Sunday-Thursday, 9:00 AM-6:00 PM</dd></div>
      </dl>
      <a class="button" href="${href("book")}">Book consultation</a>
    </div>
    <img src="${image.room}" alt="Modern clinic corridor and reception area">
  </section>`);

const aboutPage = shell("about", "About", `${srTitle("About")}
  <section class="shell split-feature page-block">
    <img src="${image.room}" alt="Aster Clinic interior">
    <div>
      <span class="eyebrow">Aster Clinic</span>
      <h2>A private aesthetic practice built around restraint and clinical clarity.</h2>
      <p>Aster brings consultation-led facial aesthetics, skin treatments, and follow-up care into one quiet private clinic in Abdoun.</p>
    </div>
  </section>`);

const patientInfoPage = shell("patient-info", "Patient Information", `${srTitle("Patient Information")}
  <section class="shell page-block">
    <div class="lead-copy">
      <span class="eyebrow">Patient information</span>
      <p>Practical guidance for consultation preparation, photography consent, aftercare, and follow-up visits.</p>
    </div>
    <div class="info-grid">
      ${[
        ["Consultation", "Bring previous procedure history, medication details, and clear questions about goals or concerns."],
        ["Photography", "Clinical photography is used only with patient consent and privacy controls."],
        ["Recovery", "Downtime, swelling, and follow-up timing are explained before any treatment."],
        ["Urgent care", "For severe pain, breathing difficulty, bleeding, or sudden swelling, seek emergency care."],
      ].map(([name, copy]) => `<article><h2>${name}</h2><p>${copy}</p></article>`).join("")}
    </div>
  </section>`);

const approachPage = shell("case-study", "Care Approach", `${srTitle("Care Approach")}
  <section class="shell split-feature page-block">
    <img src="${image.consult}" alt="Doctor explaining a treatment plan">
    <div>
      <span class="eyebrow">Care approach</span>
      <h2>Every treatment starts with suitability, not selling.</h2>
      <p>Patients see the likely path, recovery expectations, risks, and follow-up rhythm before making a decision.</p>
    </div>
  </section>`);

const pages = {
  index: home,
  services: servicesPage,
  portfolio: portfolioPage,
  doctors: doctorsPage,
  book: bookPage,
  contact: contactPage,
  about: aboutPage,
  "patient-info": patientInfoPage,
  "case-study": approachPage,
};

mkdirSync(out, { recursive: true });

writeFileSync(
  path.join(out, "clinic-v2.css"),
  `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
:root{--ink:#171717;--muted:#68625f;--paper:#f7f3ee;--surface:#fffdf9;--line:#ded7cf;--taupe:#a18d7b;--clay:#7b5746;--deep:#20201f;--cream:#fbf8f3;--container:1180px}
*{box-sizing:border-box}
html{scroll-behavior:smooth;overflow-x:hidden}
body{margin:0;overflow-x:hidden;background:var(--paper);color:var(--ink);font-family:Manrope,Arial,sans-serif;font-size:16px;line-height:1.55}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%;object-fit:cover}
button,input,select,textarea{font:inherit}
.skip-link{position:absolute;left:16px;top:-60px;background:var(--deep);color:white;padding:10px 14px;z-index:100}
.skip-link:focus{top:12px}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
.shell{width:min(calc(100% - 40px),var(--container));margin-inline:auto}
.topbar{position:sticky;top:0;z-index:50;background:rgba(247,243,238,.9);backdrop-filter:blur(18px);border-bottom:1px solid rgba(23,23,23,.09)}
.nav-shell{height:70px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.brand{display:inline-flex;align-items:center;gap:12px;font-weight:800;letter-spacing:0}
.brand-mark{width:35px;height:35px;border:1px solid var(--ink);display:grid;place-items:center;font-size:.72rem;font-weight:800;letter-spacing:.03em;flex:0 0 auto}
.nav-links{display:flex;align-items:center;gap:4px}
.nav-links a{padding:9px 11px;color:var(--muted);font-size:.88rem;font-weight:700}
.nav-links a:hover,.nav-links a.active{color:var(--ink)}
.nav-actions{display:flex;align-items:center;gap:11px}
.phone-link{font-size:.9rem;font-weight:700;color:var(--muted)}
.menu-button{display:none;width:42px;height:42px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer}
.menu-button svg,.button svg,a svg,.check-list svg{width:17px;height:17px;flex:0 0 auto}
.mobile-menu{display:none}
.button{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:48px;border:1px solid var(--deep);background:var(--deep);color:white;padding:13px 18px;font-size:.9rem;font-weight:800;cursor:pointer;transition:background .2s,border-color .2s,color .2s}
.button:hover{background:#34322f}
.button-small{min-height:40px;padding:10px 14px}
.button-soft{background:var(--surface);color:var(--deep);border-color:var(--line)}
.button-soft:hover{border-color:var(--deep);background:white}
.button-light{background:var(--cream);color:var(--deep);border-color:var(--cream)}
.button-ghost-light{background:transparent;color:white;border-color:rgba(255,255,255,.3)}
.actions{display:flex;flex-wrap:wrap;gap:10px}
.eyebrow{display:block;margin:0 0 13px;color:var(--clay);font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
h2,p{margin-top:0}
h2{font-family:Manrope,Arial,sans-serif;font-weight:600;font-size:clamp(1.8rem,3.6vw,3.8rem);line-height:1.04;letter-spacing:0;margin-bottom:18px;overflow-wrap:break-word}
p{color:var(--muted)}
.hero{display:grid;grid-template-columns:.88fr 1.12fr;gap:58px;align-items:center;padding:58px 0 42px}
.hero-copy{min-width:0}
.hero-copy h2{font-size:clamp(2.45rem,5vw,5rem);max-width:680px}
.hero-copy p{font-size:1.08rem;max-width:590px;margin-bottom:28px}
.hero-gallery{position:relative;min-height:590px;overflow:hidden;border:1px solid var(--line);background:var(--surface);box-shadow:0 28px 80px rgba(23,23,23,.08)}
.hero-gallery img{width:100%;height:100%;filter:saturate(.92)}
.hero-main{position:absolute;inset:0;height:590px}
.hero-inset{display:none}
.signal-row{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-bottom:50px}
.signal-row div{padding:25px 24px}
.signal-row div+div{border-left:1px solid var(--line)}
.signal-row span{display:block;color:var(--clay);font-size:.78rem;font-weight:800;margin-bottom:18px}
.signal-row strong{display:block;font-size:1.05rem;margin-bottom:6px}
.signal-row p{margin:0;font-size:.94rem}
.image-section,.portfolio-preview,.page-block{padding:58px 0}
.image-section>div:first-child,.lead-copy{display:grid;grid-template-columns:.45fr .55fr;gap:32px;align-items:start;margin-bottom:24px}
.image-section h2,.lead-copy p{margin-bottom:0}
.treatment-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.treatment-card,.info-grid article{background:var(--surface);border:1px solid var(--line);padding:26px;min-height:250px}
.treatment-card span,.result-card span,.doctor-card span,.comparison-panel span{display:block;color:var(--clay);font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px}
.treatment-card h2,.doctor-card h2,.result-card h2,.info-grid h2{font-family:Manrope,Arial,sans-serif;font-weight:800;font-size:1.18rem;line-height:1.2;margin-bottom:10px}
.treatment-card p,.doctor-card p,.result-card p,.info-grid p{font-size:.95rem;margin-bottom:18px}
.treatment-card a,.doctor-card a,.section-title a{display:inline-flex;align-items:center;gap:8px;color:var(--clay);font-weight:800;font-size:.9rem}
.section-title{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:16px;margin-bottom:18px}
.results-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.result-card{background:var(--surface);border:1px solid var(--line)}
.result-card img{width:100%;height:300px}
.result-card div{padding:20px}
.portfolio-layout{display:grid;gap:18px}
.comparison-panel{display:grid;grid-template-columns:1.15fr .85fr;gap:28px;align-items:end;background:var(--deep);color:white;padding:18px}
.comparison-panel p{color:#d9d3cb}
.comparison-panel h2{font-size:2.2rem}
.comparison-images{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.comparison-images figure{position:relative;margin:0;height:420px;overflow:hidden}
.comparison-images img{width:100%;height:100%}
.comparison-images figcaption{position:absolute;left:12px;bottom:12px;background:rgba(247,243,238,.9);color:var(--ink);padding:7px 10px;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.12em}
.split-feature{display:grid;grid-template-columns:1.05fr .95fr;gap:44px;align-items:center;padding:58px 0}
.split-feature>img{width:100%;height:500px}
.check-list{display:grid;gap:12px;list-style:none;margin:24px 0 0;padding:0}
.check-list li{display:flex;align-items:center;gap:10px;font-weight:800}
.doctor-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.doctor-card{background:var(--surface);border:1px solid var(--line)}
.doctor-card img{width:100%;height:360px}
.doctor-card span,.doctor-card h2,.doctor-card p,.doctor-card a{margin-left:20px;margin-right:20px}
.doctor-card span{margin-top:20px}
.doctor-card a{margin-bottom:22px}
.booking-page,.contact-page{display:grid;grid-template-columns:1.1fr .9fr;gap:30px;align-items:start;padding:44px 0 70px}
.booking-form,.contact-panel{background:var(--surface);border:1px solid var(--line);padding:28px}
.lead-copy.compact{display:block;margin-bottom:22px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}
.form-grid label{display:grid;gap:8px;font-size:.82rem;font-weight:800;color:var(--ink)}
.form-grid input,.form-grid select,.form-grid textarea{width:100%;min-height:52px;border:1px solid #d4cbc1;background:#fffaf4;padding:12px 13px;outline:none}
.form-grid input:focus,.form-grid select:focus,.form-grid textarea:focus{border-color:var(--clay);box-shadow:0 0 0 4px rgba(123,87,70,.12)}
.form-grid select{appearance:none;background-image:linear-gradient(45deg,transparent 50%,var(--clay) 50%),linear-gradient(135deg,var(--clay) 50%,transparent 50%);background-position:calc(100% - 18px) 22px,calc(100% - 12px) 22px;background-size:6px 6px,6px 6px;background-repeat:no-repeat}
.full{grid-column:1/-1}
.submit{width:100%;margin-top:18px}
.form-status{margin:16px 0 0;padding:13px;background:#eee5dc;color:var(--clay);font-weight:800}
.booking-side{position:sticky;top:92px;background:var(--deep);color:white}
.booking-side img{width:100%;height:430px}
.booking-side div{padding:24px}
.booking-side h2{font-family:Manrope,Arial,sans-serif;font-size:1.7rem;font-weight:800}
.booking-side p{color:#d9d3cb}
.contact-page>img{width:100%;height:560px}
.large-link{display:block;font-size:clamp(1.45rem,3vw,2.4rem);font-weight:700;line-height:1.2;margin:10px 0}
.contact-panel dl{display:grid;gap:18px;margin:28px 0}
dt{font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--clay);font-weight:800}
dd{margin:4px 0 0;color:var(--muted)}
.info-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.cta-strip{background:var(--deep);color:white;padding:44px 0}
.cta-inner{display:flex;align-items:end;justify-content:space-between;gap:30px}
.cta-inner h2{font-size:2rem;margin:0;max-width:620px}
.cta-strip .eyebrow{color:#d7b7a5}
.footer{background:#151514;color:white;padding:40px 0}
.footer-grid{display:grid;grid-template-columns:1.15fr .85fr .85fr .85fr;gap:28px}
.footer p,.footer a{color:#d9d3cb;display:block;margin:5px 0}
.footer h2{font-family:Manrope,Arial,sans-serif;font-size:.76rem;text-transform:uppercase;letter-spacing:.12em;margin-bottom:10px}
.footer-brand .brand-mark{border-color:white}
.mobile-cta{display:none}
@media(max-width:1020px){.nav-links,.phone-link{display:none}.menu-button{display:grid;place-items:center}.mobile-menu.open{display:grid;gap:8px;padding:12px 20px 18px;border-top:1px solid var(--line);background:var(--paper)}.mobile-menu a{padding:12px;background:var(--surface);border:1px solid var(--line);font-weight:800}.hero,.comparison-panel,.split-feature,.booking-page,.contact-page{grid-template-columns:1fr}.hero-gallery{min-height:520px}.treatment-grid,.info-grid{grid-template-columns:repeat(2,1fr)}.results-grid,.doctor-grid{grid-template-columns:1fr 1fr}.image-section>div:first-child,.lead-copy{grid-template-columns:1fr}.booking-side{position:static}.footer-grid{grid-template-columns:1fr 1fr}}
@media(max-width:680px){body{padding-bottom:72px}.shell{width:calc(100% - 28px);max-width:var(--container)}.nav-shell{width:100%;max-width:none;height:64px;gap:12px;padding-inline:14px}.nav-actions{margin-left:auto;flex:0 0 auto}.nav-actions .button{display:none}.menu-button{width:40px;height:40px;flex:0 0 40px}.brand{min-width:0}.brand span:last-child{white-space:nowrap}.brand-mark{width:33px;height:33px}.hero{padding:36px 0 24px;gap:28px}.hero-copy{max-width:100%;overflow:hidden}.hero-copy h2{font-size:2rem;line-height:1.08;max-width:350px}.hero-copy p{font-size:1rem;max-width:350px}.actions{display:grid;grid-template-columns:1fr;max-width:350px}.actions .button{width:100%;min-width:0}.hero-gallery{min-height:390px;width:100%}.hero-main{height:390px}.hero-inset{display:none}.signal-row,.treatment-grid,.results-grid,.doctor-grid,.info-grid,.form-grid,.footer-grid{grid-template-columns:1fr}.signal-row div+div{border-left:0;border-top:1px solid var(--line)}.image-section,.portfolio-preview,.page-block,.split-feature{padding:42px 0}.section-title{display:block}.section-title a{margin-top:10px}.comparison-panel{padding:12px}.comparison-images{grid-template-columns:1fr}.comparison-images figure{height:310px}.result-card img,.doctor-card img{height:320px}.contact-page>img,.split-feature>img,.booking-side img{height:330px}.cta-inner{display:block}.cta-inner .actions{margin-top:18px}.mobile-cta{position:fixed;left:0;right:0;bottom:0;z-index:60;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;width:100vw;padding:9px 12px;background:var(--paper);border-top:1px solid var(--line)}.mobile-cta .button{min-height:52px;min-width:0;width:100%;padding-inline:8px;white-space:nowrap}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto;transition:none!important}}
`,
);

writeFileSync(
  path.join(out, "clinic-v2.js"),
  `(() => {
  const menu = document.querySelector("[data-menu-toggle]");
  const mobile = document.querySelector("[data-mobile-nav]");
  menu?.addEventListener("click", () => mobile?.classList.toggle("open"));
  document.querySelector("[data-demo-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("[data-form-status]");
    if (status) status.hidden = false;
  });
})();
`,
);

for (const route of routes) {
  const dir = route === "index" ? out : path.join(out, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), pages[route]);
}

console.log(`clinic export: wrote ${routes.length} pages`);
