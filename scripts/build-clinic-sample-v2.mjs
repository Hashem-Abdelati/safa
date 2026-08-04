import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "samples", "clinic");
const routes = ["index", "about", "services", "doctors", "patient-info", "book", "contact", "case-study"];

const image = {
  hero: "https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?auto=format&fit=crop&w=1800&q=82",
  corridor: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1500&q=82",
  familyDoctor: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=82",
  internalDoctor: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=82",
  pediatrician: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1400&q=82",
  detail: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=82",
};

const nav = [
  ["index", "Home"],
  ["services", "Services"],
  ["doctors", "Doctors"],
  ["patient-info", "Patient Info"],
  ["contact", "Contact"],
];

const services = [
  ["General Medicine", "Everyday symptoms, first assessments, prescriptions, and referrals."],
  ["Preventive Checkups", "Annual physicals, screenings, blood work review, and risk planning."],
  ["Family Care", "Ongoing care for adults, children, and recurring health concerns."],
  ["Follow-up Visits", "Results, treatment reviews, medication checks, and chronic condition support."],
];

const doctors = [
  ["Dr. Lina Haddad", "Family Medicine", image.familyDoctor, "Preventive care, family health, and long-term patient follow-up.", "Sun-Wed"],
  ["Dr. Omar Khalil", "Internal Medicine", image.internalDoctor, "Adult diagnostics, treatment planning, and chronic condition care.", "Mon-Thu"],
  ["Dr. Rania Nasser", "Pediatrics", image.pediatrician, "Children's visits, vaccinations, family guidance, and growth checks.", "Sun-Tue"],
];

function href(route) {
  return route === "index" ? "/samples/clinic/index.html" : `/samples/clinic/${route}/index.html`;
}

function icon(name) {
  const common = 'aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const paths = {
    arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M8 2v4M16 2v4M3 10h18"></path>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"></path>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"></path>',
    map: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"></path><circle cx="12" cy="10" r="2.5"></circle>',
    check: '<path d="m5 12 4 4L19 6"></path>',
  };
  return `<svg ${common}>${paths[name]}</svg>`;
}

function shell(route, title, content, options = {}) {
  const active = route === "about" || route === "case-study" ? "index" : route;
  const cta = options.hideCta ? "" : `<section class="cta-band">
    <div class="shell cta-grid">
      <div>
        <p class="label">Appointments</p>
        <h2>Book a visit with reception confirmation.</h2>
      </div>
      <div class="button-row">
        <a class="button button-light" href="${href("book")}">${icon("calendar")}Book appointment</a>
        <a class="button button-outline-light" href="tel:+96265550184">${icon("phone")}Call clinic</a>
      </div>
    </div>
  </section>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} - Aster Clinic</title>
  <meta name="description" content="Aster Clinic provides general medicine, preventive checkups, family care, and follow-up visits in Abdoun, Amman.">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="stylesheet" href="/samples/clinic/clinic-v2.css">
  <script defer src="/samples/clinic/clinic-v2.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="shell header-grid">
      <a class="brand" href="${href("index")}" aria-label="Aster Clinic home">
        <span class="brand-mark">A</span>
        <span>ASTER CLINIC<small>Abdoun, Amman</small></span>
      </a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        ${nav.map(([key, label]) => `<a class="${active === key ? "active" : ""}" href="${href(key)}">${label}</a>`).join("")}
      </nav>
      <div class="header-actions">
        <a class="phone-link" href="tel:+96265550184">+962 6 555 0184</a>
        <a class="button button-small" href="${href("book")}">Book</a>
        <button class="menu-button" type="button" data-menu-toggle aria-label="Open menu">${icon("menu")}</button>
      </div>
    </div>
    <nav class="mobile-nav" data-mobile-nav aria-label="Mobile navigation">
      ${nav.map(([key, label]) => `<a href="${href(key)}">${label}</a>`).join("")}
      <a href="${href("book")}">Book appointment</a>
    </nav>
  </header>
  <main id="main">${content}${cta}</main>
  <footer class="footer">
    <div class="shell footer-grid">
      <div>
        <a class="brand brand-light" href="${href("index")}"><span class="brand-mark">A</span><span>ASTER CLINIC<small>Abdoun, Amman</small></span></a>
      </div>
      <div><h2>Hours</h2><p>Sunday-Thursday<br>8:30 AM-6:00 PM</p></div>
      <div><h2>Contact</h2><a href="tel:+96265550184">+962 6 555 0184</a><a href="mailto:hello@asterclinic.jo">hello@asterclinic.jo</a></div>
      <div><h2>Visit</h2><p>14 Al-Kindi Street<br>Abdoun, Amman</p></div>
    </div>
  </footer>
  <div class="mobile-cta"><a class="button button-secondary" href="tel:+96265550184">${icon("phone")}Call</a><a class="button" href="${href("book")}">${icon("calendar")}Book</a></div>
</body>
</html>`;
}

function pageTitle(text) {
  return `<h1 class="sr-only">${text}</h1>`;
}

const home = shell("index", "Private medical care", `${pageTitle("Aster Clinic")}
  <section class="hero shell">
    <div class="hero-copy">
      <p class="label">Private clinic in Abdoun</p>
      <h2>Medical care that is simple to understand and easy to book.</h2>
      <p>General medicine, preventive checkups, family care, and follow-up visits with clear next steps.</p>
      <div class="button-row">
        <a class="button" href="${href("book")}">${icon("calendar")}Book appointment</a>
        <a class="button button-secondary" href="${href("services")}">View services</a>
      </div>
    </div>
    <figure class="hero-media">
      <img src="${image.hero}" alt="Doctor seated in a modern clinic consultation room">
    </figure>
  </section>
  <section class="quick-strip shell" aria-label="Clinic essentials">
    <div><strong>Same-week</strong><span>Appointment requests</span></div>
    <div><strong>08:30-18:00</strong><span>Sunday to Thursday</span></div>
    <div><strong>Abdoun</strong><span>Central Amman location</span></div>
  </section>
  <section class="section shell">
    <div class="section-head">
      <p class="label">Services</p>
      <a class="text-link" href="${href("services")}">All services ${icon("arrow")}</a>
    </div>
    <div class="service-grid">${services.map(([name, copy]) => `<article class="service-card"><h2>${name}</h2><p>${copy}</p></article>`).join("")}</div>
  </section>
  <section class="section shell split">
    <img src="${image.corridor}" alt="Clean clinic corridor with natural light">
    <div>
      <p class="label">How visits work</p>
      <h2>Clear information before, during, and after the appointment.</h2>
      <ul class="check-list">
        <li>${icon("check")}Know which service to book</li>
        <li>${icon("check")}Choose doctor or first available time</li>
        <li>${icon("check")}Receive a confirmation call from reception</li>
      </ul>
    </div>
  </section>`);

const servicesPage = shell("services", "Services", `${pageTitle("Services")}
  <section class="page-shell shell services-list">
    <div class="section-head compact">
      <p class="label">Services</p>
      <p>Choose the service that matches the visit. Reception confirms the right appointment length when they call.</p>
    </div>
    ${services.map(([name, copy], index) => `<article class="row-card">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><h2>${name}</h2><p>${copy}</p></div>
      <a class="text-link" href="${href("book")}">Book ${icon("arrow")}</a>
    </article>`).join("")}
  </section>`);

const doctorsPage = shell("doctors", "Doctors", `${pageTitle("Doctors")}
  <section class="page-shell shell doctor-list">
    <div class="section-head compact">
      <p class="label">Doctors</p>
      <p>Each profile shows specialty, focus, and availability so patients can choose quickly.</p>
    </div>
    ${doctors.map(([name, specialty, img, bio, availability]) => `<article class="profile-card">
      <img src="${img}" alt="${name}">
      <div>
        <p class="label">${specialty}</p>
        <h2>${name}</h2>
        <p>${bio}</p>
        <dl><div><dt>Availability</dt><dd>${availability}</dd></div><div><dt>Languages</dt><dd>Arabic, English</dd></div></dl>
        <a class="button button-secondary" href="${href("book")}">Book with ${name.split(" ")[1]}</a>
      </div>
    </article>`).join("")}
  </section>`);

const infoPage = shell("patient-info", "Patient Information", `${pageTitle("Patient Information")}
  <section class="page-shell shell info-grid">
    ${[
      ["Before your visit", "Bring an ID, current medications, and any recent reports or test results."],
      ["Results", "Your doctor reviews results and explains the recommended next step in plain language."],
      ["Insurance", "Coverage depends on provider network status. Call reception before booking."],
      ["Rescheduling", "Please call as early as possible so the clinic can offer the time to another patient."],
      ["Urgent symptoms", "For chest pain, severe bleeding, breathing difficulty, or sudden weakness, go to emergency care."],
      ["Accessibility", "The clinic entrance is step-free. Let reception know if you need assistance."],
    ].map(([name, copy]) => `<article><h2>${name}</h2><p>${copy}</p></article>`).join("")}
  </section>`);

const bookPage = shell("book", "Book Appointment", `${pageTitle("Book Appointment")}
  <section class="page-shell shell booking-layout">
    <form class="booking-form" data-demo-form>
      <div class="section-head compact">
        <p class="label">Appointment request</p>
        <p>Send your preferred time. Reception will call to confirm availability.</p>
      </div>
      <div class="form-grid">
        <label>Full name<input required type="text" autocomplete="name"></label>
        <label>Phone number<input required type="tel" autocomplete="tel"></label>
        <label>Email<input type="email" autocomplete="email"></label>
        <label>Preferred date<input required type="date"></label>
        <label>Service<select required><option value="">Select a service</option>${services.map(([name]) => `<option>${name}</option>`).join("")}</select></label>
        <label>Doctor<select><option>First available</option>${doctors.map(([name]) => `<option>${name}</option>`).join("")}</select></label>
        <label class="full">Message<textarea rows="4" placeholder="Briefly describe the reason for your visit."></textarea></label>
      </div>
      <button class="button submit" type="submit">${icon("calendar")}Request appointment</button>
      <p class="form-status" data-form-status hidden>Request received. Reception would call to confirm the appointment.</p>
    </form>
    <aside class="side-panel">
      <img src="${image.detail}" alt="Doctor reviewing notes on a tablet">
      <div><h2>Clinic details</h2><p>Sunday-Thursday, 8:30 AM-6:00 PM<br>14 Al-Kindi Street, Abdoun</p></div>
    </aside>
  </section>`, { hideCta: true });

const contactPage = shell("contact", "Contact", `${pageTitle("Contact")}
  <section class="page-shell shell contact-layout">
    <div class="contact-card">
      <p class="label">Contact</p>
      <a class="large-contact" href="tel:+96265550184">+962 6 555 0184</a>
      <a class="large-contact" href="mailto:hello@asterclinic.jo">hello@asterclinic.jo</a>
      <dl>
        <div><dt>Address</dt><dd>14 Al-Kindi Street, Abdoun, Amman</dd></div>
        <div><dt>Hours</dt><dd>Sunday-Thursday, 8:30 AM-6:00 PM</dd></div>
      </dl>
      <div class="button-row"><a class="button" href="${href("book")}">Book appointment</a><a class="button button-secondary" href="tel:+96265550184">Call</a></div>
    </div>
    <div class="map-card"><img src="${image.corridor}" alt="Clinic corridor"><span>${icon("map")} Aster Clinic, Abdoun</span></div>
  </section>`);

const aboutPage = shell("about", "About", `${pageTitle("About")}
  <section class="page-shell shell split">
    <img src="${image.corridor}" alt="Modern clinic interior">
    <div>
      <p class="label">About Aster</p>
      <h2>A private clinic focused on clear care and organized follow-up.</h2>
      <p>Aster Clinic provides everyday medical care, preventive checkups, and family health support from a central Abdoun location.</p>
      <ul class="check-list">
        <li>${icon("check")}Direct booking paths</li>
        <li>${icon("check")}Readable patient information</li>
        <li>${icon("check")}Doctor profiles with practical details</li>
      </ul>
    </div>
  </section>`);

const approachPage = shell("case-study", "Care Approach", `${pageTitle("Care Approach")}
  <section class="page-shell shell split">
    <img src="${image.hero}" alt="Doctor in consultation room">
    <div>
      <p class="label">Care approach</p>
      <h2>Organized visits, clear next steps.</h2>
      <p>The clinic keeps the patient journey simple: choose a service, request a time, confirm by phone, attend the visit, and leave with a clear follow-up plan.</p>
    </div>
  </section>`);

const pages = {
  index: home,
  about: aboutPage,
  services: servicesPage,
  doctors: doctorsPage,
  "patient-info": infoPage,
  book: bookPage,
  contact: contactPage,
  "case-study": approachPage,
};

mkdirSync(out, { recursive: true });
writeFileSync(path.join(out, "clinic-v2.css"), `@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');
:root{--ink:#12313b;--muted:#5d737a;--paper:#fbfcfb;--surface:#fff;--soft:#eef8f8;--line:#dce8e7;--cyan:#0b7285;--green:#087f5b;--deep:#082f3a;--container:1160px}
*{box-sizing:border-box}html{scroll-behavior:smooth;overflow-x:hidden}body{margin:0;overflow-x:hidden;background:var(--paper);color:var(--ink);font-family:Figtree,Arial,sans-serif;font-size:16px;line-height:1.55}a{color:inherit;text-decoration:none}img{display:block;max-width:100%;object-fit:cover}button,input,select,textarea{font:inherit}.skip-link{position:absolute;left:16px;top:-60px;background:var(--deep);color:white;padding:10px 14px;z-index:100}.skip-link:focus{top:12px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.shell{width:min(calc(100% - 40px),var(--container));margin-inline:auto}.site-header{position:sticky;top:0;z-index:50;background:rgba(251,252,251,.94);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}.header-grid{height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:inline-flex;align-items:center;gap:11px;font-weight:800;letter-spacing:.12em}.brand-mark{width:36px;height:36px;border:1px solid var(--ink);border-radius:50%;display:grid;place-items:center;letter-spacing:0;flex:0 0 auto}.brand small{display:block;font-size:.62rem;font-weight:600;color:var(--muted);letter-spacing:.1em}.desktop-nav{display:flex;gap:2px}.desktop-nav a{padding:9px 11px;border-radius:6px;color:var(--muted);font-weight:700;font-size:.9rem}.desktop-nav a:hover,.desktop-nav a.active{background:var(--soft);color:var(--ink)}.header-actions{display:flex;align-items:center;gap:10px}.phone-link{font-weight:700;color:var(--muted);font-size:.92rem}.menu-button{display:none;width:44px;height:44px;border:1px solid var(--line);border-radius:6px;background:white;color:var(--ink);cursor:pointer}.menu-button svg,.button svg,.text-link svg,.check-list svg{width:18px;height:18px;flex:0 0 auto}.mobile-nav{display:none}.button{display:inline-flex;min-height:48px;align-items:center;justify-content:center;gap:9px;border:1px solid var(--deep);border-radius:6px;background:var(--deep);color:white;padding:13px 17px;font-weight:800;cursor:pointer;transition:background .2s,border-color .2s,color .2s;min-width:0}.button:hover{background:#0d4350}.button-secondary{background:white;color:var(--deep);border-color:var(--line)}.button-secondary:hover{border-color:var(--deep);background:#f7fcfb}.button-light{background:white;color:var(--deep);border-color:white}.button-outline-light{background:transparent;color:white;border-color:rgba(255,255,255,.32)}.button-small{min-height:42px;padding:10px 14px}.button-row{display:flex;flex-wrap:wrap;gap:10px}.label{margin:0 0 12px;color:var(--cyan);font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase}h2,h3,p{margin-top:0}h2{font-size:clamp(1.7rem,3.2vw,3.5rem);line-height:1.04;letter-spacing:0;margin-bottom:18px;overflow-wrap:break-word}p{color:var(--muted)}.hero{display:grid;grid-template-columns:.95fr 1.05fr;gap:52px;align-items:center;padding:56px 0 36px}.hero-copy,.hero-media{min-width:0}.hero-copy h2{font-size:clamp(2.4rem,5vw,4.9rem);line-height:.96;max-width:620px}.hero-copy p:not(.label){font-size:1.15rem;max-width:570px}.hero-media{margin:0;overflow:hidden;border-radius:8px;background:var(--soft);height:520px}.hero-media img{width:100%;height:100%}.quick-strip{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line);border-radius:8px;background:white;overflow:hidden;margin-bottom:42px}.quick-strip div{padding:22px}.quick-strip div+div{border-left:1px solid var(--line)}.quick-strip strong{display:block;font-size:1.3rem}.quick-strip span{color:var(--muted)}.section{padding:72px 0}.page-shell{padding:42px 0 74px}.section-head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:22px;border-bottom:1px solid var(--line);padding-bottom:18px}.section-head.compact{align-items:start}.section-head.compact p:not(.label){max-width:620px;margin:0}.text-link{display:inline-flex;align-items:center;gap:8px;color:var(--green);font-weight:800}.service-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.service-card,.info-grid article{background:white;border:1px solid var(--line);border-radius:8px;padding:24px;min-height:190px}.service-card h2,.info-grid h2{font-size:1.18rem;line-height:1.18;margin-bottom:10px}.service-card p,.info-grid p{font-size:.96rem;margin-bottom:0}.split{display:grid;grid-template-columns:1.08fr .92fr;gap:44px;align-items:center}.split>img{height:430px;width:100%;border-radius:8px}.check-list{display:grid;gap:12px;list-style:none;margin:24px 0 0;padding:0}.check-list li{display:flex;align-items:center;gap:10px;font-weight:700}.check-list svg{color:var(--green);flex:0 0 auto}.services-list{display:grid;gap:0}.row-card{display:grid;grid-template-columns:70px 1fr auto;gap:24px;align-items:center;border-bottom:1px solid var(--line);padding:26px 0}.row-card:first-of-type{border-top:1px solid var(--line)}.row-card>span{font-weight:800;color:var(--cyan);letter-spacing:.08em}.row-card h2{font-size:1.55rem;margin-bottom:6px}.row-card p{margin:0}.doctor-list{display:grid;gap:16px}.profile-card{display:grid;grid-template-columns:310px 1fr;gap:30px;background:white;border:1px solid var(--line);border-radius:8px;padding:16px}.profile-card img{width:100%;height:320px;border-radius:6px}.profile-card h2{font-size:2rem}.profile-card dl{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:22px 0}.profile-card dt,.contact-card dt{font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--cyan);font-weight:800}.profile-card dd,.contact-card dd{margin:0}.info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.booking-layout,.contact-layout{display:grid;grid-template-columns:1.15fr .85fr;gap:34px;align-items:start}.booking-form,.contact-card{background:white;border:1px solid var(--line);border-radius:8px;padding:28px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.form-grid label{display:grid;gap:8px;font-weight:800}.form-grid input,.form-grid select,.form-grid textarea{width:100%;min-height:52px;border:1px solid #cbdad8;border-radius:6px;background:#fbfefd;padding:12px 13px;outline:none}.form-grid input:focus,.form-grid select:focus,.form-grid textarea:focus{border-color:var(--cyan);box-shadow:0 0 0 4px rgba(11,114,133,.13)}.full{grid-column:1/-1}.submit{width:100%;margin-top:18px}.form-status{margin:16px 0 0;padding:13px;background:var(--soft);border-radius:6px;color:var(--green);font-weight:800}.side-panel,.map-card{position:sticky;top:96px;background:var(--deep);color:white;border-radius:8px;overflow:hidden}.side-panel img,.map-card img{width:100%;height:330px;opacity:.9}.side-panel div{padding:24px}.side-panel h2,.map-card h2{font-size:1.5rem}.side-panel p{color:#bdd2d4}.contact-card .large-contact{display:block;font-size:clamp(1.4rem,3vw,2.3rem);line-height:1.1;font-weight:800;margin:8px 0}.contact-card dl{display:grid;gap:16px;margin:24px 0}.map-card span{display:flex;gap:10px;align-items:center;padding:18px;font-weight:800}.map-card svg{width:20px}.cta-band{background:var(--deep);color:white;padding:48px 0}.cta-grid{display:flex;align-items:end;justify-content:space-between;gap:32px}.cta-band h2{font-size:2rem;max-width:540px;margin:0}.cta-band .label{color:#8ee9df}.footer{background:#061f27;color:white;padding:42px 0 28px}.footer-grid{display:grid;grid-template-columns:1.2fr .9fr .9fr .9fr;gap:28px}.footer h2{font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px}.footer p,.footer a{color:#bdd2d4;display:block;margin:5px 0}.brand-light .brand-mark{border-color:white}.mobile-cta{display:none}@media(max-width:980px){.desktop-nav,.phone-link{display:none}.menu-button{display:grid;place-items:center}.header-grid{height:68px}.mobile-nav.open{display:grid;gap:8px;padding:12px 20px 18px;border-top:1px solid var(--line);background:var(--paper)}.mobile-nav a{padding:12px;background:white;border:1px solid var(--line);border-radius:6px}.hero,.split,.booking-layout,.contact-layout{grid-template-columns:1fr;gap:28px}.hero{padding-top:38px}.hero-media{height:420px}.quick-strip,.service-grid,.info-grid{grid-template-columns:1fr 1fr}.profile-card{grid-template-columns:250px 1fr}.side-panel,.map-card{position:static}.footer-grid{grid-template-columns:1fr 1fr}}@media(max-width:640px){body{padding-bottom:74px}.shell{width:min(calc(100% - 28px),var(--container))}.brand{max-width:250px;font-size:.8rem}.brand-mark{width:34px;height:34px}.header-actions .button{display:none}.hero-copy h2{font-size:1.9rem;line-height:1.06;max-width:330px}.hero-copy p:not(.label){font-size:1rem;max-width:330px}.hero-media{height:340px}.button-row{display:grid;grid-template-columns:1fr;align-items:stretch}.hero .button-row{grid-template-columns:1fr;max-width:330px}.quick-strip,.service-grid,.info-grid,.profile-card,.form-grid,.footer-grid{grid-template-columns:1fr}.quick-strip div+div{border-left:0;border-top:1px solid var(--line)}.section{padding:54px 0}.page-shell{padding:28px 0 56px}.section-head{display:block}.row-card{grid-template-columns:42px 1fr}.row-card .text-link{grid-column:2}.profile-card img{height:300px}.profile-card dl{grid-template-columns:1fr}.split>img,.side-panel img,.map-card img{height:300px}.cta-grid{display:block}.cta-grid .button-row{margin-top:20px}.cta-grid .button{width:100%}.mobile-cta{position:fixed;left:0;right:0;bottom:0;z-index:60;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;padding:9px 12px;background:var(--paper);border-top:1px solid var(--line)}.mobile-cta .button{min-height:54px;width:100%;padding-inline:8px;gap:6px;font-size:.95rem;white-space:nowrap}.mobile-cta svg{display:none}}@media(max-width:380px){.hero .button-row{grid-template-columns:1fr;max-width:330px}.hero-copy h2{font-size:1.95rem}.mobile-cta{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto;transition:none!important}}
`);

writeFileSync(path.join(out, "clinic-v2.js"), `(() => {
  const menu = document.querySelector("[data-menu-toggle]");
  const mobile = document.querySelector("[data-mobile-nav]");
  menu?.addEventListener("click", () => mobile?.classList.toggle("open"));
  document.querySelector("[data-demo-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("[data-form-status]");
    if (status) status.hidden = false;
  });
})();
`);

for (const route of routes) {
  const dir = route === "index" ? out : path.join(out, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), pages[route]);
}

console.log(`clinic export: wrote ${routes.length} pages`);
