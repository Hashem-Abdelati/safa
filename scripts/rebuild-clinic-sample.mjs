import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const target = path.join(root, "public", "samples", "clinic");
const base = "/samples/clinic";

const images = {
  hero: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1800&q=84",
  room: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=84",
  consult: "https://images.unsplash.com/photo-1713085085470-fba013d67e65?auto=format&fit=crop&w=1500&q=84",
  doctorA: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=84",
  doctorB: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=84",
  doctorC: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=84",
  skinA: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=84",
  skinB: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=84",
  profileA: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=84",
  profileB: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=84",
  treatment: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=1500&q=84",
};

const routes = [
  ["home", "", "Home"],
  ["services", "services", "Treatments"],
  ["portfolio", "portfolio", "Results"],
  ["doctors", "doctors", "Doctors"],
  ["patient-info", "patient-info", "Patient Info"],
  ["contact", "contact", "Contact"],
];

const pages = {
  index: {
    id: "home",
    title: "Aster Clinic",
    description: "Private aesthetic surgery and skin clinic.",
    body: homePage(),
  },
  services: {
    id: "services",
    title: "Treatments - Aster Clinic",
    description: "Consultation-led surgical, injectable, laser, and skin treatments.",
    body: servicesPage(),
  },
  portfolio: {
    id: "portfolio",
    title: "Results - Aster Clinic",
    description: "A polished consent-based results gallery for an aesthetic clinic.",
    body: resultsPage(),
  },
  doctors: {
    id: "doctors",
    title: "Doctors - Aster Clinic",
    description: "Meet the medical team at Aster Clinic.",
    body: doctorsPage(),
  },
  "patient-info": {
    id: "patient-info",
    title: "Patient Information - Aster Clinic",
    description: "Clear patient information, preparation, and safety guidance.",
    body: patientInfoPage(),
  },
  contact: {
    id: "contact",
    title: "Contact - Aster Clinic",
    description: "Contact and location details for Aster Clinic.",
    body: contactPage(),
  },
  book: {
    id: "book",
    title: "Book Consultation - Aster Clinic",
    description: "Book a private consultation with Aster Clinic.",
    body: bookPage(),
  },
  about: {
    id: "about",
    title: "About - Aster Clinic",
    description: "About Aster Clinic and its clinical approach.",
    body: aboutPage(),
  },
  "case-study": {
    id: "case-study",
    title: "Clinical Standards - Aster Clinic",
    description: "Clinical standards, consent, photography, and patient care.",
    body: standardsPage(),
  },
};

function href(route) {
  return route ? `${base}/${route}/index.html` : `${base}/index.html`;
}

function arrow() {
  return '<span aria-hidden="true">-&gt;</span>';
}

function shell(page) {
  const nav = routes
    .map(([id, route, label]) => `<a class="${page.id === id ? "active" : ""}" href="${href(route)}">${label}</a>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="icon" href="/favicon.png" sizes="512x512" type="image/png">
  <link rel="stylesheet" href="${base}/aster.css">
  <script defer src="${base}/aster.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="${href("")}" aria-label="Aster Clinic home">
      <span class="brand-mark">A</span>
      <span><strong>Aster</strong><small>Private aesthetic clinic</small></span>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">${nav}</nav>
    <div class="header-actions">
      <a class="button button-small" href="${href("book")}">Book</a>
      <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false"><span></span></button>
    </div>
  </header>
  <nav class="mobile-nav" aria-label="Mobile navigation">
    ${nav}
    <a class="button" href="${href("book")}">Book consultation</a>
  </nav>
  <main id="main">${page.body}</main>
  ${footer()}
  <div class="mobile-cta">
    <a class="button button-soft" href="tel:+96265550184">Call</a>
    <a class="button" href="${href("book")}">Book</a>
  </div>
</body>
</html>
`;
}

function footer() {
  return `<footer class="footer">
    <div class="footer-inner">
      <div>
        <a class="brand footer-brand" href="${href("")}"><span class="brand-mark">A</span><span><strong>Aster</strong><small>Private aesthetic clinic</small></span></a>
        <p>Consultation-led aesthetic surgery, skin health, and follow-up care in Abdoun.</p>
      </div>
      <div><h2>Visit</h2><p>Abdoun, Amman<br>Sun-Thu, 9 AM-6 PM</p></div>
      <div><h2>Contact</h2><a href="tel:+96265550184">+962 6 555 0184</a><a href="mailto:hello@asterclinic.jo">hello@asterclinic.jo</a></div>
      <div><h2>Patients</h2><a href="${href("patient-info")}">Preparation</a><a href="${href("case-study")}">Clinical standards</a></div>
    </div>
  </footer>`;
}

function sectionIntro(kicker, title, text) {
  return `<section class="page-lead">
    <p class="eyebrow">${kicker}</p>
    <div>
      <h1>${title}</h1>
      <p>${text}</p>
    </div>
  </section>`;
}

function cta() {
  return `<section class="consult-strip">
    <div>
      <p class="eyebrow">Private consultation</p>
      <h2>Understand the options before choosing a treatment.</h2>
    </div>
    <a class="button button-light" href="${href("book")}">Book consultation ${arrow()}</a>
  </section>`;
}

function treatmentCards(limit = 4) {
  const treatments = [
    ["Facial surgery", "Rhinoplasty, eyelid surgery, facelift planning, and revision consultations with measured outcomes.", "Consultation, planning, surgery, review"],
    ["Injectables", "Natural-looking toxin and filler treatments led by facial assessment, proportion, and patient goals.", "Assessment, treatment, follow-up"],
    ["Skin health", "Laser resurfacing, pigmentation care, acne scarring, and medical-grade maintenance plans.", "Diagnosis, protocol, review"],
    ["Post-surgery care", "Scar management, swelling review, skin recovery, and long-term treatment planning.", "Recovery, monitoring, refinement"],
  ].slice(0, limit);

  return treatments
    .map(
      ([title, text, meta], index) => `<article class="treatment-card">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${title}</h3>
        <p>${text}</p>
        <small>${meta}</small>
        <a href="${href("book")}">Discuss treatment ${arrow()}</a>
      </article>`,
    )
    .join("");
}

function resultCards() {
  const cases = [
    ["Profile balance", "Surgical planning", images.profileA, images.profileB],
    ["Skin texture", "Laser and recovery care", images.skinA, images.skinB],
    ["Facial refinement", "Treatment planning", images.skinB, images.profileB],
  ];

  return cases
    .map(
      ([title, type, before, after]) => `<article class="result-card">
        <div class="compare">
          <figure><img src="${before}" alt="${title} before clinical photography"><figcaption>Before</figcaption></figure>
          <figure><img src="${after}" alt="${title} after clinical photography"><figcaption>After</figcaption></figure>
        </div>
        <div class="result-copy">
          <p class="eyebrow">${type}</p>
          <h3>${title}</h3>
          <p>Consent-based result presentation with consistent lighting, angles, timing, and plain-language notes.</p>
        </div>
      </article>`,
    )
    .join("");
}

function doctorCards() {
  const doctors = [
    ["Dr. Lina Haddad", "Consultant plastic surgeon", images.doctorA, "Facial surgery, rhinoplasty, eyelid surgery"],
    ["Dr. Omar Nassar", "Aesthetic physician", images.doctorB, "Injectables, facial balancing, regenerative skin care"],
    ["Dr. Maya Rafiq", "Dermatology lead", images.doctorC, "Laser protocols, acne scarring, pigmentation"],
  ];

  return doctors
    .map(
      ([name, role, image, focus]) => `<article class="doctor-card">
        <img src="${image}" alt="${name}">
        <div>
          <p class="eyebrow">${role}</p>
          <h3>${name}</h3>
          <p>${focus}</p>
          <a href="${href("book")}">Book consultation ${arrow()}</a>
        </div>
      </article>`,
    )
    .join("");
}

function homePage() {
  return `<section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Private aesthetic clinic - Abdoun</p>
      <h1>Considered aesthetic care, led by doctors.</h1>
      <p>Aster Clinic brings surgical consultation, facial aesthetics, skin health, and follow-up care into one quiet clinical setting.</p>
      <div class="button-row">
        <a class="button" href="${href("book")}">Book consultation ${arrow()}</a>
        <a class="button button-soft" href="${href("portfolio")}">View results</a>
      </div>
    </div>
    <div class="hero-media">
      <img src="${images.hero}" alt="Modern private clinic reception and corridor">
      <div class="hero-panel">
        <span>01</span>
        <strong>Consult first</strong>
        <p>Clear assessment before any treatment is recommended.</p>
      </div>
    </div>
  </section>
  <section class="trust-row">
    <div><strong>Doctor-led</strong><span>Consultations and treatment planning led by licensed clinicians.</span></div>
    <div><strong>Evidence-based</strong><span>Plain medical information, suitability, downtime, and aftercare.</span></div>
    <div><strong>Consent-first</strong><span>Photography and results handled with privacy and documented consent.</span></div>
  </section>
  <section class="split-section">
    <img src="${images.room}" alt="Doctor reviewing medical information in a clinic">
    <div>
      <p class="eyebrow">The approach</p>
      <h2>Clean information, quiet confidence, and no clutter.</h2>
      <p>Patients arrive with questions. The website answers them clearly: what a treatment is for, who it may suit, what recovery can involve, and when to speak with a doctor.</p>
      <a class="text-link" href="${href("patient-info")}">Read patient information ${arrow()}</a>
    </div>
  </section>
  <section class="section-block">
    <div class="section-heading">
      <p class="eyebrow">Treatments</p>
      <h2>Focused treatment paths.</h2>
      <a class="text-link" href="${href("services")}">All treatments ${arrow()}</a>
    </div>
    <div class="treatment-grid">${treatmentCards()}</div>
  </section>
  <section class="section-block surface">
    <div class="section-heading">
      <p class="eyebrow">Results</p>
      <h2>Before and after, presented responsibly.</h2>
      <a class="text-link" href="${href("portfolio")}">Open results ${arrow()}</a>
    </div>
    <div class="results-grid">${resultCards()}</div>
  </section>
  <section class="doctors-preview">
    <div>
      <p class="eyebrow">Medical team</p>
      <h2>Patients know who they are meeting before they book.</h2>
      <p>Doctor profiles show qualifications, focus areas, and the kind of consultation each clinician leads.</p>
      <a class="button button-soft" href="${href("doctors")}">Meet the doctors ${arrow()}</a>
    </div>
    <div class="doctor-strip">${doctorCards()}</div>
  </section>
  ${cta()}`;
}

function servicesPage() {
  return `${sectionIntro("Treatments", "Clear treatment information, without the noise.", "Each page is built around suitability, risks, downtime, aftercare, and the next best step for the patient.")}
  <section class="treatment-grid treatment-grid-large">${treatmentCards()}</section>
  <section class="detail-band">
    <div>
      <p class="eyebrow">How information is written</p>
      <h2>Concise, factual, and easy to scan.</h2>
      <p>Medical content avoids exaggerated claims. Patients see what the treatment is for, when it may not be suitable, and why consultation matters.</p>
    </div>
    <ul class="check-list">
      <li>Suitability and contraindications</li>
      <li>Expected recovery and review timeline</li>
      <li>Preparation and aftercare notes</li>
      <li>Clear calls to book or ask a question</li>
    </ul>
  </section>
  ${cta()}`;
}

function resultsPage() {
  return `${sectionIntro("Results", "A gallery that builds trust without overpromising.", "Before and after imagery is structured with consent, consistent photography, clinical notes, and careful expectations.")}
  <section class="results-grid results-grid-page">${resultCards()}</section>
  <section class="detail-band">
    <div>
      <p class="eyebrow">Photography standards</p>
      <h2>Same angle. Same light. Same honesty.</h2>
      <p>A premium clinic site should never make results feel like a trick. The gallery is designed for consistent framing and short clinician-reviewed notes.</p>
    </div>
    <img src="${images.treatment}" alt="Aesthetic treatment room prepared for patient care">
  </section>
  ${cta()}`;
}

function doctorsPage() {
  return `${sectionIntro("Doctors", "A clinical team presented with calm authority.", "Patients should understand qualifications, focus areas, and who will guide their treatment plan.")}
  <section class="doctor-grid">${doctorCards()}</section>
  <section class="split-section reverse">
    <img src="${images.consult}" alt="Doctor consultation in a private clinical office">
    <div>
      <p class="eyebrow">Consultation process</p>
      <h2>Every treatment starts with a medical conversation.</h2>
      <p>The doctor reviews goals, anatomy, history, medication, risk factors, and realistic timelines before recommending a plan.</p>
      <a class="text-link" href="${href("book")}">Book consultation ${arrow()}</a>
    </div>
  </section>`;
}

function patientInfoPage() {
  const items = [
    ["Before you visit", "Bring previous procedure notes, current medication, allergies, and clear questions about goals or concerns."],
    ["Suitability", "Not every treatment suits every patient. The consultation screens health history, skin type, anatomy, and expectations."],
    ["Recovery", "Downtime depends on treatment type. Patients receive written aftercare and a review plan before leaving."],
    ["Results", "Results vary. Aster uses consented photography, consistent review timing, and careful language around outcomes."],
  ];

  return `${sectionIntro("Patient information", "Straight answers before a patient books.", "This is where a healthcare website earns trust: preparation, safety, aftercare, and realistic expectations.")}
  <section class="info-list">
    ${items.map(([title, text]) => `<article><h2>${title}</h2><p>${text}</p></article>`).join("")}
  </section>
  <section class="detail-band">
    <div>
      <p class="eyebrow">Medical content</p>
      <h2>Clear, concise, and regulation-aware.</h2>
      <p>Clinical pages are written to inform rather than pressure. Claims are avoided unless they can be supported, and patients are directed to consultation for personal advice.</p>
    </div>
    <ul class="check-list">
      <li>No miracle claims</li>
      <li>No hidden recovery expectations</li>
      <li>Consent-led photography</li>
      <li>Easy contact paths</li>
    </ul>
  </section>`;
}

function contactPage() {
  return `<section class="contact-layout">
    <div>
      <p class="eyebrow">Contact</p>
      <h1>Speak with Aster Clinic.</h1>
      <p>Book a consultation, ask a treatment question, or request patient information before your visit.</p>
      <div class="contact-methods">
        <a class="large-link" href="tel:+96265550184">+962 6 555 0184</a>
        <a class="large-link" href="mailto:hello@asterclinic.jo">hello@asterclinic.jo</a>
      </div>
      <a class="button" href="${href("book")}">Book consultation ${arrow()}</a>
    </div>
    <img src="${images.hero}" alt="Aster Clinic reception and corridor">
  </section>
  <section class="location-grid">
    <article><h2>Location</h2><p>Abdoun, Amman<br>Jordan</p></article>
    <article><h2>Hours</h2><p>Sunday-Thursday<br>9:00 AM-6:00 PM</p></article>
    <article><h2>Arrival</h2><p>Private reception, lift access, and discreet check-in available.</p></article>
  </section>`;
}

function bookPage() {
  return `${sectionIntro("Book consultation", "A considered first appointment.", "Tell the clinic what you want to understand. The team will confirm the right consultation type and next available time.")}
  <section class="booking-layout">
    <form class="booking-form">
      ${["Full name", "Phone number", "Email", "Treatment interest"].map((label, index) => `<label><span>${label}</span><input ${index < 3 ? "required" : ""} type="${index === 1 ? "tel" : index === 2 ? "email" : "text"}"></label>`).join("")}
      <label><span>Preferred date</span><input type="date"></label>
      <label><span>Preferred time</span><select><option>Morning</option><option>Afternoon</option><option>No preference</option></select></label>
      <label class="full"><span>What would you like to discuss?</span><textarea rows="5"></textarea></label>
      <button class="button" type="submit">Request consultation ${arrow()}</button>
      <p class="form-note" role="status" hidden>Thank you. The clinic will contact you to confirm the appointment.</p>
    </form>
    <aside class="booking-aside">
      <img src="${images.consult}" alt="Doctor consultation in a clinic office">
      <h2>What happens next</h2>
      <p>A coordinator reviews your request, confirms the consultation type, and shares preparation notes before your appointment.</p>
    </aside>
  </section>`;
}

function aboutPage() {
  return `${sectionIntro("About", "A private clinic built around calm, clarity, and restraint.", "Aster combines surgical expertise, skin health, clinical photography, and structured follow-up in one patient-centred setting.")}
  <section class="split-section">
    <img src="${images.hero}" alt="Modern clinic interior">
    <div>
      <p class="eyebrow">Brand experience</p>
      <h2>Premium without feeling cold.</h2>
      <p>The clinic brand uses warm materials, concise language, real people, and clear medical pathways. The site feels polished because it removes uncertainty rather than adding decoration.</p>
      <a class="text-link" href="${href("services")}">Explore treatments ${arrow()}</a>
    </div>
  </section>
  <section class="values-grid">
    <article><h2>Clarity</h2><p>Patients understand the treatment, recovery, and consultation process.</p></article>
    <article><h2>Evidence</h2><p>Medical information is factual, restrained, and reviewed by clinicians.</p></article>
    <article><h2>Privacy</h2><p>Photography, booking, and patient communication are handled discreetly.</p></article>
  </section>`;
}

function standardsPage() {
  return `${sectionIntro("Clinical standards", "A healthcare site should earn trust before it sells.", "Aster's content model is built around brand consistency, factual medical information, high-quality imagery, and clear patient action.")}
  <section class="standards">
    <article><span>01</span><h2>Clean, branded design</h2><p>Consistent typography, photography, tone, and spacing make the clinic memorable without adding clutter.</p></article>
    <article><span>02</span><h2>Clear medical information</h2><p>Treatment content explains conditions, suitability, downtime, and aftercare in plain language.</p></article>
    <article><span>03</span><h2>Engaging health content</h2><p>Patient education, results notes, and doctor insight establish authority without exaggerated claims.</p></article>
    <article><span>04</span><h2>Strong calls to action</h2><p>Patients can book, call, email, or read preparation guidance without searching.</p></article>
    <article><span>05</span><h2>High-quality imagery</h2><p>Clinic interiors, doctors, treatment rooms, and results photography make the service feel real and credible.</p></article>
  </section>`;
}

const css = `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

:root {
  --ink: #111820;
  --muted: #53606b;
  --paper: #f7f5ef;
  --surface: #fffdf8;
  --sage: #64746a;
  --blue: #16263a;
  --gold: #b59a63;
  --line: rgba(17, 24, 32, 0.14);
  --shadow: 0 24px 70px rgba(17, 24, 32, 0.1);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; overflow-x: hidden; background: var(--paper); }
body {
  margin: 0;
  overflow-x: hidden;
  background: var(--paper);
  color: var(--ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.6;
  text-rendering: optimizeLegibility;
}

a { color: inherit; text-decoration: none; }
img { display: block; width: 100%; height: auto; }
button, input, select, textarea { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
:focus-visible { outline: 3px solid rgba(181, 154, 99, 0.65); outline-offset: 3px; }

.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 100;
  background: var(--ink);
  color: white;
  padding: 10px 14px;
  transform: translateY(-160%);
}
.skip-link:focus { transform: translateY(0); }

.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 76px;
  padding: 0 clamp(18px, 4vw, 44px);
  border-bottom: 1px solid var(--line);
  background: rgba(247, 245, 239, 0.92);
  backdrop-filter: blur(16px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: max-content;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--ink);
  border-radius: 50%;
  color: var(--ink);
  font-weight: 700;
}

.brand strong {
  display: block;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brand small {
  display: block;
  color: var(--muted);
  font-size: 0.72rem;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 28px);
  color: var(--muted);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.desktop-nav a {
  padding: 28px 0;
  border-bottom: 2px solid transparent;
}

.desktop-nav a:hover,
.desktop-nav a.active {
  color: var(--ink);
  border-color: var(--gold);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-button {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
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
  inset: 76px 0 auto;
  z-index: 25;
  display: none;
  padding: 22px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}

.mobile-nav.open {
  display: grid;
  gap: 12px;
}

.mobile-nav a:not(.button) {
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  font-size: 1.08rem;
  font-weight: 700;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  border: 1px solid var(--ink);
  border-radius: 999px;
  background: var(--ink);
  color: white;
  padding: 0 20px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.button:hover { background: var(--blue); border-color: var(--blue); }
.button-soft { background: transparent; color: var(--ink); border-color: var(--line); }
.button-soft:hover { background: var(--surface); color: var(--ink); border-color: var(--gold); }
.button-light { background: var(--surface); color: var(--ink); border-color: var(--surface); }
.button-light:hover { background: #eef0e9; border-color: #eef0e9; }
.button-small { min-height: 40px; padding-inline: 16px; font-size: 0.72rem; }
.button-row { display: flex; flex-wrap: wrap; gap: 12px; }

.eyebrow {
  margin: 0 0 12px;
  color: var(--sage);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1, h2, h3, p { margin-top: 0; }
h1, h2, h3 {
  color: var(--ink);
  line-height: 1.05;
  letter-spacing: -0.025em;
}
h1 { max-width: 980px; font-size: clamp(2.7rem, 7vw, 6.7rem); }
h2 { font-size: clamp(2rem, 4vw, 4.2rem); }
h3 { font-size: 1.35rem; }
p { color: var(--muted); }

.hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(380px, 1.1fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: center;
  min-height: calc(100svh - 76px);
  padding: clamp(34px, 7vw, 92px) clamp(18px, 4vw, 44px);
}

.hero-copy p:not(.eyebrow) {
  max-width: 620px;
  font-size: clamp(1rem, 1.5vw, 1.18rem);
}

.hero-media {
  position: relative;
  min-height: 640px;
  overflow: hidden;
  border-radius: 8px;
  background: #d8ddd7;
}

.hero-media img,
.split-section > img,
.detail-band > img,
.contact-layout > img,
.booking-aside img {
  height: 100%;
  object-fit: cover;
}

.hero-panel {
  position: absolute;
  right: 22px;
  bottom: 22px;
  width: min(310px, calc(100% - 44px));
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.65);
  border-radius: 8px;
  background: rgba(255, 253, 248, 0.9);
  box-shadow: var(--shadow);
}

.hero-panel span {
  color: var(--gold);
  font-size: 0.74rem;
  font-weight: 800;
}

.hero-panel strong {
  display: block;
  margin: 6px 0;
  font-size: 1.05rem;
}

.hero-panel p { margin: 0; font-size: 0.9rem; }

.trust-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-block: 1px solid var(--line);
}

.trust-row div {
  min-height: 150px;
  padding: clamp(22px, 4vw, 42px);
  border-right: 1px solid var(--line);
}

.trust-row div:last-child { border-right: 0; }
.trust-row strong { display: block; margin-bottom: 8px; font-size: 1.1rem; }
.trust-row span { color: var(--muted); }

.split-section,
.contact-layout,
.booking-layout,
.detail-band {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(28px, 6vw, 86px);
  align-items: center;
  padding: clamp(56px, 8vw, 120px) clamp(18px, 4vw, 44px);
}

.split-section.reverse > img { order: 2; }
.split-section > img,
.detail-band > img,
.contact-layout > img,
.booking-aside img {
  min-height: 520px;
  border-radius: 8px;
}

.split-section p,
.detail-band p,
.contact-layout p,
.booking-aside p {
  max-width: 620px;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 6px;
  color: var(--ink);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-block {
  padding: clamp(56px, 8vw, 110px) clamp(18px, 4vw, 44px);
}

.surface { background: #edece4; }

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.section-heading h2 { max-width: 760px; margin-bottom: 0; }

.treatment-grid,
.doctor-grid,
.results-grid,
.values-grid,
.info-list,
.standards,
.location-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  padding: clamp(34px, 5vw, 70px) clamp(18px, 4vw, 44px);
}

.section-block .treatment-grid,
.section-block .results-grid {
  padding: 0;
}

.treatment-grid-large { grid-template-columns: repeat(2, minmax(0, 1fr)); }

.treatment-card,
.values-grid article,
.info-list article,
.standards article,
.location-grid article {
  min-height: 310px;
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.treatment-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.treatment-card > span,
.standards span {
  color: var(--gold);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.treatment-card p { flex: 1; }
.treatment-card small {
  display: block;
  margin-bottom: 18px;
  color: var(--sage);
  font-weight: 700;
}
.treatment-card a,
.doctor-card a {
  margin-top: auto;
  color: var(--ink);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.results-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.results-grid-page {
  padding-top: 20px;
}

.result-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 360px;
}

.compare figure {
  position: relative;
  margin: 0;
  overflow: hidden;
}

.compare img {
  height: 100%;
  object-fit: cover;
}

.compare figure:first-child img {
  filter: saturate(0.78) contrast(0.95);
}

.compare figcaption {
  position: absolute;
  left: 12px;
  bottom: 12px;
  border-radius: 999px;
  background: rgba(17, 24, 32, 0.8);
  color: white;
  padding: 6px 9px;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.result-copy { padding: 22px; }
.result-copy p:last-child { margin-bottom: 0; }

.doctors-preview {
  display: grid;
  grid-template-columns: 0.75fr 1.25fr;
  gap: clamp(24px, 5vw, 64px);
  padding: clamp(56px, 8vw, 110px) clamp(18px, 4vw, 44px);
}

.doctor-strip,
.doctor-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.doctor-strip {
  display: grid;
  gap: 16px;
}

.doctor-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.doctor-card img {
  aspect-ratio: 4 / 4.8;
  object-fit: cover;
  object-position: center top;
}

.doctor-card div { padding: 22px; }

.consult-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin: clamp(18px, 4vw, 44px);
  padding: clamp(28px, 5vw, 54px);
  border-radius: 8px;
  background: var(--blue);
  color: white;
}

.consult-strip h2,
.consult-strip .eyebrow { color: white; }
.consult-strip h2 { max-width: 760px; margin: 0; }

.page-lead {
  display: grid;
  grid-template-columns: 0.32fr 1fr;
  gap: clamp(24px, 6vw, 88px);
  padding: clamp(42px, 7vw, 90px) clamp(18px, 4vw, 44px) clamp(24px, 4vw, 52px);
  border-bottom: 1px solid var(--line);
}

.page-lead h1 {
  max-width: 960px;
  margin-bottom: 16px;
  font-size: clamp(2.25rem, 5vw, 5rem);
}

.page-lead p:not(.eyebrow) {
  max-width: 690px;
  font-size: 1.05rem;
}

.detail-band {
  background: #edece4;
}

.check-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.check-list li {
  border-bottom: 1px solid var(--line);
  padding: 14px 0;
  color: var(--ink);
  font-weight: 700;
}

.info-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.standards {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.contact-layout h1 { font-size: clamp(2.6rem, 6vw, 5.8rem); }
.contact-methods {
  display: grid;
  gap: 10px;
  margin: 30px 0;
}

.large-link {
  color: var(--ink);
  font-size: clamp(1.3rem, 2.6vw, 2.2rem);
  font-weight: 700;
}

.location-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-top: 0;
}

.booking-layout {
  align-items: start;
}

.booking-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.booking-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.booking-form label span {
  color: var(--ink);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
.form-note {
  grid-column: 1 / -1;
}

.form-note {
  margin: 0;
  border-radius: 8px;
  background: #e5eadf;
  color: var(--ink);
  padding: 14px;
}

.booking-aside {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  overflow: hidden;
}

.booking-aside img { min-height: 360px; }
.booking-aside h2,
.booking-aside p { margin-inline: 24px; }
.booking-aside h2 { margin-top: 24px; }
.booking-aside p { margin-bottom: 24px; }

.footer {
  background: #0f1419;
  color: white;
  padding: clamp(44px, 6vw, 74px) clamp(18px, 4vw, 44px) 88px;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: clamp(24px, 5vw, 70px);
}

.footer p,
.footer a,
.footer small {
  color: rgba(255, 255, 255, 0.72);
}

.footer h2 {
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer a {
  display: block;
  margin-bottom: 8px;
}

.footer-brand { color: white; margin-bottom: 16px; }
.footer-brand .brand-mark { border-color: rgba(255,255,255,0.45); color: white; }

.mobile-cta { display: none; }

@media (max-width: 1080px) {
  .desktop-nav { display: none; }
  .menu-button { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; }
  .hero,
  .split-section,
  .contact-layout,
  .booking-layout,
  .detail-band,
  .doctors-preview,
  .page-lead {
    grid-template-columns: 1fr;
  }
  .hero { min-height: auto; }
  .hero-media { min-height: 520px; }
  .trust-row,
  .treatment-grid,
  .treatment-grid-large,
  .results-grid,
  .doctor-strip,
  .doctor-grid,
  .values-grid,
  .info-list,
  .standards,
  .location-grid,
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
  .split-section.reverse > img { order: 0; }
}

@media (max-width: 680px) {
  body { padding-bottom: 72px; }
  .site-header { min-height: 68px; padding-inline: 16px; }
  .brand small { display: none; }
  .header-actions .button-small { display: none; }
  .mobile-nav { inset-block-start: 68px; }
  h1 { font-size: clamp(2.35rem, 12vw, 3.35rem); line-height: 1.08; }
  h2 { font-size: clamp(1.9rem, 10vw, 3rem); }
  .hero { padding-top: 34px; }
  .hero-copy,
  .hero-media {
    max-width: min(100%, 358px);
  }
  .hero-copy p:not(.eyebrow) { font-size: 1rem; }
  .button-row { display: grid; grid-template-columns: 1fr; }
  .button-row .button { width: 100%; }
  .hero,
  .split-section,
  .contact-layout,
  .booking-layout,
  .detail-band,
  .doctors-preview,
  .page-lead,
  .section-block,
  .treatment-grid,
  .doctor-grid,
  .results-grid,
  .values-grid,
  .info-list,
  .standards,
  .location-grid {
    padding-inline: 16px;
  }
  .hero-media,
  .split-section > img,
  .detail-band > img,
  .contact-layout > img,
  .booking-aside img {
    min-height: 360px;
  }
  .trust-row,
  .treatment-grid,
  .treatment-grid-large,
  .results-grid,
  .doctor-strip,
  .doctor-grid,
  .values-grid,
  .info-list,
  .standards,
  .location-grid,
  .footer-inner,
  .booking-form {
    grid-template-columns: 1fr;
  }
  .section-heading,
  .consult-strip {
    align-items: flex-start;
    flex-direction: column;
  }
  .treatment-card,
  .values-grid article,
  .info-list article,
  .standards article {
    min-height: auto;
  }
  .compare { min-height: 260px; }
  .footer { padding-bottom: 96px; }
  .mobile-cta {
    position: fixed;
    inset-inline: 0;
    bottom: 0;
    z-index: 40;
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    border-top: 1px solid var(--line);
    background: var(--surface);
    padding: 8px;
    gap: 8px;
  }
  .mobile-cta .button { min-height: 52px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
`;

const js = `(() => {
  const menuButton = document.querySelector(".menu-button");
  const mobileNav = document.querySelector(".mobile-nav");
  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        mobileNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      }
    });
  }

  const form = document.querySelector(".booking-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const note = form.querySelector(".form-note");
      if (note) note.hidden = false;
    });
  }
})();
`;

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
writeFileSync(path.join(target, "aster.css"), css);
writeFileSync(path.join(target, "aster.js"), js);

for (const [route, page] of Object.entries(pages)) {
  const dir = route === "index" ? target : path.join(target, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), shell(page));
}

console.log(`Rebuilt clinic sample at ${target}`);
