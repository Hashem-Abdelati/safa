import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const workspace = "/Users/hashemabdelati/Desktop/safa-website";
const target = path.join(workspace, "public", "samples", "clinic");
const assetSource = path.join(workspace, "public", "sample-assets", "clinic");

const routes = [
  ["index", "Home"],
  ["services", "Treatments"],
  ["portfolio", "Results"],
  ["doctors", "Doctors"],
  ["patient-info", "Patient Info"],
  ["contact", "Contact"],
];

const treatments = [
  {
    title: "Facial surgery",
    text: "Consultation-led planning for rhinoplasty, eyelid surgery, neck refinement, and facial balance.",
  },
  {
    title: "Skin health",
    text: "Laser, pigmentation, texture, acne scarring, and medical-grade maintenance programs.",
  },
  {
    title: "Injectables",
    text: "Subtle toxin and filler treatment planned around proportion, movement, and long-term restraint.",
  },
  {
    title: "Recovery care",
    text: "Follow-up appointments, scar care, swelling review, and skin support after treatment.",
  },
];

const doctors = [
  ["Dr. Leila Haddad", "Consultant aesthetic surgeon", "Facial surgery, revision consultation, recovery planning"],
  ["Dr. Omar Nasser", "Dermatologist", "Laser, pigmentation, acne scarring, medical skin health"],
  ["Rania Saleh", "Nurse practitioner", "Injectables support, preparation, post-treatment care"],
];

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function routeHref(route) {
  return route === "index" ? "/samples/clinic/index.html" : `/samples/clinic/${route}/index.html`;
}

function nav(active) {
  return routes
    .map(([route, label]) => `<a${route === active ? ' class="active"' : ""} href="${routeHref(route)}">${label}</a>`)
    .join("");
}

function page({ route, title, description, body, lead = true }) {
  const routeDir = route === "index" ? target : path.join(target, route);
  ensureDir(routeDir);
  const leadMarkup = lead
    ? `<section class="page-lead">
        <p class="kicker">Aster Clinic</p>
        <h1>${title}</h1>
        <p>${description}</p>
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
      <small>Private aesthetic clinic</small>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">${nav(route)}</nav>
    <div class="header-actions">
      <a class="book-link" href="/samples/clinic/book/index.html">Book</a>
      <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false"><span></span></button>
    </div>
  </header>
  <nav class="mobile-nav" aria-label="Mobile navigation">
    ${nav(route)}
    <a class="button" href="/samples/clinic/book/index.html">Book consultation</a>
  </nav>
  <main id="main">
    ${leadMarkup}
    ${body}
  </main>
  ${footer()}
  <div class="mobile-cta">
    <a class="button ghost" href="tel:+962798509111">Call</a>
    <a class="button" href="/samples/clinic/book/index.html">Book</a>
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
        <small>Private aesthetic clinic</small>
      </a>
      <p>Quiet, doctor-led aesthetic care with clear information, consistent follow-up, and responsible result presentation.</p>
    </div>
    <nav aria-label="Footer navigation">
      <a href="/samples/clinic/services/index.html">Treatments</a>
      <a href="/samples/clinic/portfolio/index.html">Results</a>
      <a href="/samples/clinic/doctors/index.html">Doctors</a>
      <a href="/samples/clinic/contact/index.html">Contact</a>
    </nav>
    <div>
      <span>Abdoun, Amman</span>
      <span>Sun - Thu, 9:00 - 18:00</span>
      <span>+962 79 850 9111</span>
    </div>
  </footer>`;
}

const treatmentCards = treatments
  .map(
    (item) => `<article class="quiet-card">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <a href="/samples/clinic/book/index.html">Discuss treatment</a>
    </article>`,
  )
  .join("");

const doctorCards = doctors
  .map(
    ([name, role, focus]) => `<article class="quiet-card doctor-item">
      <h3>${name}</h3>
      <p>${role}</p>
      <span>${focus}</span>
    </article>`,
  )
  .join("");

function home() {
  page({
    route: "index",
    title: "Aster Clinic",
    description: "Doctor-led aesthetic care in a calm private clinic.",
    lead: false,
    body: `<section class="hero">
      <div class="hero-copy">
        <p class="kicker">Private aesthetic clinic - Amman</p>
        <h1>Calm, considered aesthetic care.</h1>
        <p>Aster Clinic brings consultation, skin health, facial aesthetics, and follow-up care into one quiet clinical setting.</p>
        <div class="button-row">
          <a class="button" href="/samples/clinic/book/index.html">Book consultation</a>
          <a class="button ghost" href="/samples/clinic/portfolio/index.html">View results</a>
        </div>
      </div>
      <figure class="hero-image">
        <img src="/samples/clinic/media/interior.jpg" alt="Warm modern private clinic reception">
      </figure>
    </section>

    <section class="trust-strip" aria-label="Clinic values">
      <div><strong>Doctor-led</strong><span>Every treatment begins with assessment and suitability.</span></div>
      <div><strong>Measured</strong><span>Information is clear, realistic, and easy to act on.</span></div>
      <div><strong>Private</strong><span>Photography, results, and follow-up are handled carefully.</span></div>
    </section>

    <section class="image-text">
      <img src="/samples/clinic/media/team.jpg" alt="Aster Clinic medical team">
      <div>
        <p class="kicker">Clinical team</p>
        <h2>A clinical team, not a rushed treatment menu.</h2>
        <p>Patients are guided through what matters: who is treating them, what the treatment involves, what recovery can look like, and whether a procedure is suitable at all.</p>
        <a class="text-link" href="/samples/clinic/doctors/index.html">Meet the team</a>
      </div>
    </section>

    <section class="section">
      <div class="section-top">
        <div>
          <p class="kicker">Treatments</p>
          <h2>Clear paths of care.</h2>
        </div>
        <a class="text-link" href="/samples/clinic/services/index.html">All treatments</a>
      </div>
      <div class="card-grid">${treatmentCards}</div>
    </section>

    <section class="result-feature">
      <div>
        <p class="kicker">Results</p>
        <h2>Matched photography. Realistic expectations.</h2>
        <p>Results are shown with consistent angle, lighting, and timing so patients can understand outcomes responsibly.</p>
        <a class="text-link" href="/samples/clinic/portfolio/index.html">View result approach</a>
      </div>
      <img src="/samples/clinic/media/result-face.jpg" alt="Matched before and after aesthetic clinic result">
    </section>
    ${consultCta()}`,
  });
}

function consultCta() {
  return `<section class="consult-cta">
    <p class="kicker">Consultation</p>
    <h2>Start with a private assessment.</h2>
    <a class="button light" href="/samples/clinic/book/index.html">Book consultation</a>
  </section>`;
}

function services() {
  page({
    route: "services",
    title: "Treatments",
    description: "Clear medical information, suitability, recovery notes, and consultation paths.",
    body: `<section class="section tight">
      <div class="card-grid two">${treatmentCards}</div>
    </section>
    <section class="image-text reverse">
      <img src="/samples/clinic/media/interior.jpg" alt="Private clinic treatment corridor">
      <div>
        <p class="kicker">How care is planned</p>
        <h2>No pressure. No menu of promises.</h2>
        <p>Each treatment page is written to explain suitability, preparation, downtime, alternatives, and when a doctor should advise against treatment.</p>
        <ul class="check-list">
          <li>Consultation before recommendation</li>
          <li>Evidence-based patient information</li>
          <li>Aftercare and follow-up built into the path</li>
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
    description: "A responsible result library with matched photography and clear clinical notes.",
    body: `<section class="result-case">
      <img src="/samples/clinic/media/result-face.jpg" alt="Matched before and after facial aesthetic result">
      <div>
        <p class="kicker">Case 01</p>
        <h2>Facial balance and skin quality</h2>
        <p>Shown as one matched case rather than unrelated images. Same patient, same angle, same lighting, and a subtle result that feels medically credible.</p>
        <dl class="case-notes">
          <div><dt>Focus</dt><dd>Skin texture, facial balance, recovery care</dd></div>
          <div><dt>Timing</dt><dd>Final review after healing interval</dd></div>
          <div><dt>Standard</dt><dd>Consent-led photography, consistent documentation</dd></div>
        </dl>
      </div>
    </section>
    <section class="section tight">
      <div class="card-grid three">
        <article class="quiet-card"><h3>Consent</h3><p>Images are used only with documented permission and clear treatment context.</p></article>
        <article class="quiet-card"><h3>Consistency</h3><p>Angles, lighting, makeup, and timing are controlled to avoid misleading results.</p></article>
        <article class="quiet-card"><h3>Expectation</h3><p>Every result is individual. Consultation explains what is realistic and safe.</p></article>
      </div>
    </section>
    ${consultCta()}`,
  });
}

function doctorsPage() {
  page({
    route: "doctors",
    title: "Doctors",
    description: "A small clinical team with clear roles and a restrained, patient-first approach.",
    body: `<section class="image-text">
      <img src="/samples/clinic/media/team.jpg" alt="Aster Clinic doctors and nurse practitioner">
      <div>
        <p class="kicker">Team</p>
        <h2>The person you meet matters as much as the treatment.</h2>
        <p>Profiles explain clinical focus, patient approach, and when each practitioner is involved in care.</p>
      </div>
    </section>
    <section class="section tight">
      <div class="card-grid three">${doctorCards}</div>
    </section>`,
  });
}

function patientInfo() {
  page({
    route: "patient-info",
    title: "Patient information",
    description: "Plain preparation, recovery, safety, and follow-up guidance.",
    body: `<section class="section tight">
      <div class="card-grid two">
        <article class="quiet-card"><h3>Before consultation</h3><p>Bring your history, current medication, previous procedures, allergies, and goals. The first appointment is for assessment, not pressure.</p></article>
        <article class="quiet-card"><h3>Before treatment</h3><p>Preparation notes are specific to treatment type and may include medication guidance, skincare pauses, and recovery planning.</p></article>
        <article class="quiet-card"><h3>After treatment</h3><p>Patients receive written aftercare, expected recovery signs, and clear instructions for urgent concerns.</p></article>
        <article class="quiet-card"><h3>Follow-up</h3><p>Review appointments document healing, answer questions, and decide whether refinement is appropriate.</p></article>
      </div>
    </section>`,
  });
}

function contact() {
  page({
    route: "contact",
    title: "Contact",
    description: "Speak with the clinic or book a private consultation.",
    body: `<section class="contact-panel">
      <div>
        <p class="kicker">Aster Clinic</p>
        <h2>Abdoun, Amman</h2>
        <p>Sunday to Thursday, 9:00 - 18:00</p>
      </div>
      <div class="contact-links">
        <a href="tel:+962798509111">+962 79 850 9111</a>
        <a href="mailto:care@asterclinic.com">care@asterclinic.com</a>
        <a class="button" href="/samples/clinic/book/index.html">Book consultation</a>
      </div>
    </section>`,
  });
}

function book() {
  page({
    route: "book",
    title: "Book consultation",
    description: "Request a private consultation with the Aster Clinic team.",
    body: `<section class="booking-layout">
      <form class="booking-form">
        <label><span>Name</span><input name="name" autocomplete="name" required></label>
        <label><span>Phone</span><input name="phone" autocomplete="tel" required></label>
        <label><span>Interest</span><select name="interest"><option>Facial surgery consultation</option><option>Skin health</option><option>Injectables</option><option>Not sure yet</option></select></label>
        <label><span>Preferred day</span><select name="day"><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option></select></label>
        <label class="full"><span>Message</span><textarea name="message" rows="5" placeholder="Tell us what you would like to discuss."></textarea></label>
        <button class="button full" type="submit">Request consultation</button>
        <p class="form-note" hidden>Thank you. The clinic will contact you to confirm the appointment.</p>
      </form>
      <img src="/samples/clinic/media/interior.jpg" alt="Aster Clinic private reception">
    </section>`,
  });
}

function about() {
  page({
    route: "about",
    title: "About Aster",
    description: "A quiet private clinic built around clarity, privacy, and measured care.",
    body: `<section class="image-text">
      <img src="/samples/clinic/media/interior.jpg" alt="Aster Clinic interior">
      <div>
        <p class="kicker">Definition</p>
        <h2>Care that feels clear before it feels cosmetic.</h2>
        <p>Aster Clinic is designed for patients who want careful information, subtle outcomes, and a clinical team that explains the full path before treatment begins.</p>
      </div>
    </section>`,
  });
}

function standards() {
  page({
    route: "case-study",
    title: "Clinical standards",
    description: "How Aster presents information, photography, consent, and follow-up.",
    body: `<section class="section tight">
      <div class="card-grid two">
        <article class="quiet-card"><h3>Information</h3><p>Treatment information is written plainly, with suitability, risks, recovery, and alternatives kept visible.</p></article>
        <article class="quiet-card"><h3>Photography</h3><p>Result photography is consent-led and matched for angle, light, timing, and context.</p></article>
        <article class="quiet-card"><h3>Privacy</h3><p>Patient information and imagery are handled with clear consent and minimal exposure.</p></article>
        <article class="quiet-card"><h3>Follow-up</h3><p>Care continues after treatment with review appointments and written aftercare.</p></article>
      </div>
    </section>`,
  });
}

const css = `@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap");

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
  overflow-x: hidden;
  background: var(--paper);
  color: var(--ink);
  font-family: Geist, "Avenir Next", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.65;
  text-rendering: optimizeLegibility;
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
.result-feature img,
.result-case img {
  aspect-ratio: 1.45 / 1;
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
  .brand small,
  .book-link { display: none; }
  .mobile-nav { inset-block-start: 66px; }
  h1 { font-size: clamp(2rem, 8.6vw, 2.68rem); line-height: 1.14; }
  h2 { font-size: clamp(1.65rem, 8vw, 2.35rem); }
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
    max-width: 358px;
  }
  .hero-copy {
    margin-bottom: 28px;
  }
  .button-row,
  .booking-form,
  .card-grid,
  .card-grid.two,
  .card-grid.three,
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
    inset-inline: 0;
    bottom: 0;
    z-index: 40;
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 8px;
    border-top: 1px solid var(--line);
    background: var(--surface);
    padding: 8px;
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
