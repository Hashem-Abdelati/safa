import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const samplesRoot = path.join(root, "public", "samples");
const siteUrl = "https://www.safaastudio.com";

const sampleMeta = {
  clinic: {
    title: "Aster Clinic Website Sample | Safa صَفاء",
    description: "A premium private clinic website sample with treatment education, doctor profiles, results, and booking.",
    image: "/sample-previews/aster-clinic-current.jpg",
  },
  noor: {
    title: "NOOR Restaurant Website Sample | Safa صَفاء",
    description: "A mobile-first restaurant website sample with menu, reservations, events, location, and Arabic support.",
    image: "/sample-previews/noor.jpg",
  },
  atelier: {
    title: "Atelier Boutique Website Sample | Safa صَفاء",
    description: "A boutique fashion commerce sample with editorial product browsing, cart, checkout, and style-led storytelling.",
    image: "/sample-previews/atelier.jpg",
  },
};

function htmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.name === "index.html" ? [fullPath] : [];
  });
}

function metaBlock({ title, description, image, pathname }) {
  const url = `${siteUrl}${pathname}`;
  const imageUrl = `${siteUrl}${image}`;
  return [
    "<!-- SAFA_SOCIAL_META_START -->",
    `<meta property="og:title" content="${htmlEscape(title)}"/>`,
    `<meta property="og:description" content="${htmlEscape(description)}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:url" content="${htmlEscape(url)}"/>`,
    `<meta property="og:site_name" content="Safa صَفاء"/>`,
    `<meta property="og:image" content="${htmlEscape(imageUrl)}"/>`,
    `<meta property="og:image:alt" content="${htmlEscape(title)} preview"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${htmlEscape(title)}"/>`,
    `<meta name="twitter:description" content="${htmlEscape(description)}"/>`,
    `<meta name="twitter:image" content="${htmlEscape(imageUrl)}"/>`,
    "<!-- SAFA_SOCIAL_META_END -->",
  ].join("");
}

for (const file of walk(samplesRoot)) {
  const relative = path.relative(samplesRoot, file);
  const sample = relative.split(path.sep)[0];
  const meta = sampleMeta[sample];
  if (!meta) continue;

  const pathname = `/samples/${relative.replaceAll(path.sep, "/")}`;
  const block = metaBlock({ ...meta, pathname });
  let html = fs.readFileSync(file, "utf8");

  html = html.replace(/<!-- SAFA_SOCIAL_META_START -->[\s\S]*?<!-- SAFA_SOCIAL_META_END -->/g, "");
  html = html.replace(/<meta property="og:[^"]+" content="[^"]*"\/?>/g, "");
  html = html.replace(/<meta name="twitter:[^"]+" content="[^"]*"\/?>/g, "");

  if (html.includes('<script src="/samples/safa-tab-meta.js" defer></script>')) {
    html = html.replace('<script src="/samples/safa-tab-meta.js" defer></script>', `${block}<script src="/samples/safa-tab-meta.js" defer></script>`);
  } else {
    html = html.replace("</head>", `${block}</head>`);
  }

  fs.writeFileSync(file, html);
}
