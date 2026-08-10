import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const workspace = "/Users/hashemabdelati/Desktop/safa-website";
const samplesRoot = path.join(workspace, "public", "samples");

const samples = [
  {
    slug: "clinic",
    source: "/Users/hashemabdelati/Desktop/clinic_sample",
    manual: true,
    routes: ["index", "about", "book", "case-study", "contact", "doctors", "patient-info", "services"],
  },
  {
    slug: "noor",
    source: "/Users/hashemabdelati/Desktop/NOOR-Restaurant-Concept",
    routes: ["index", "about", "case-study", "contact", "events", "gallery", "menu", "reservations"],
    publicDirs: ["images"],
  },
  {
    slug: "atelier",
    source: "/Users/hashemabdelati/Desktop/Atelier-NOR-Website",
    routes: ["index", "about", "cart", "case-study", "checkout", "contact", "lookbook", "new-arrivals", "shop", "style-room"],
    publicDirs: ["editorial"],
    fallbackPrefixes: { product: "shop" },
  },
];

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function rewriteHtml(html, slug, routes) {
  const prefix = `/samples/${slug}`;
  const routeSet = new Set(routes.filter((route) => route !== "index"));
  const currentSample = samples.find((sample) => sample.slug === slug);
  const fallbackPrefixes = currentSample?.fallbackPrefixes ?? {};
  const routeHref = (route, suffix = "") => {
    const cleanRoute = route.replace(/\/$/, "");
    const queryOrHash = suffix.startsWith("?") || suffix.startsWith("#") ? suffix : "";
    if (!cleanRoute) return `${prefix}/index.html${queryOrHash}`;
    return `${prefix}/${cleanRoute}/index.html${queryOrHash}`;
  };

  let output = html
    .replaceAll('"/_next/', `"${prefix}/_next/`)
    .replaceAll('"/images/', `"${prefix}/images/`)
    .replaceAll('"/editorial/', `"${prefix}/editorial/`)
    .replaceAll('="/_next/', `="${prefix}/_next/`)
    .replaceAll('="/images/', `="${prefix}/images/`)
    .replaceAll('="/editorial/', `="${prefix}/editorial/`);

  output = output.replace(/(?:\/samples\/[^/]+)?\/_next\/image\?url=([^"'\\\s&]+)(?:&amp;|&)w=\d+(?:&amp;|&)q=\d+/g, (_match, encodedUrl) => {
    const decodedUrl = decodeURIComponent(encodedUrl);
    if (decodedUrl.startsWith("/")) return `${prefix}${decodedUrl}`;
    return decodedUrl;
  });

  output = output.replace(/\b(href|action)="\/([^"#?]*)([#?][^"]*)?"/g, (match, attr, route, suffix = "") => {
    const cleanRoute = route.replace(/\/$/, "");
    if (!cleanRoute) return `${attr}="${routeHref("", suffix)}"`;
    if (cleanRoute.startsWith("samples/") || cleanRoute.startsWith("_next/")) return match;
    const firstSegment = cleanRoute.split("/")[0];
    if (fallbackPrefixes[firstSegment]) return `${attr}="${routeHref(fallbackPrefixes[firstSegment], suffix)}"`;
    if (!routeSet.has(firstSegment)) return match;
    return `${attr}="${routeHref(cleanRoute, suffix)}"`;
  });

  output = output.replace(/href\\":\\"\/([^"\\?#]*)([?#][^"\\]*)?\\"/g, (match, route, suffix = "") => {
    const cleanRoute = route.replace(/\/$/, "");
    if (!cleanRoute) return `href\\":\\"${routeHref("", suffix)}\\"`;
    if (cleanRoute.startsWith("samples/") || cleanRoute.startsWith("_next/")) return match;
    const firstSegment = cleanRoute.split("/")[0];
    if (fallbackPrefixes[firstSegment]) return `href\\":\\"${routeHref(fallbackPrefixes[firstSegment], suffix)}\\"`;
    if (!routeSet.has(firstSegment)) return match;
    return `href\\":\\"${routeHref(cleanRoute, suffix)}\\"`;
  });

  output = output.replace(
    "</head>",
    '<style data-safa-sample-shell>html,body{overflow-x:hidden}</style><script data-safa-sample-nav>document.addEventListener("click",function(event){var target=event.target;if(!target||!target.closest)return;var anchor=target.closest("a[href]");if(!anchor)return;var href=anchor.getAttribute("href");if(!href||href.charAt(0)==="#"||href.indexOf("mailto:")===0||href.indexOf("tel:")===0)return;try{var url=new URL(href,location.href);if(url.origin===location.origin&&url.pathname.indexOf("/samples/")===0){event.preventDefault();event.stopImmediatePropagation();if(anchor.target==="_blank"){window.open(url.href,"_blank","noopener,noreferrer");return}location.assign(url.href)}}catch(error){}},true);</script></head>',
  );

  return output;
}

function copyStaticAssets(sample, target) {
  const staticSource = path.join(sample.source, ".next", "static");
  if (existsSync(staticSource)) {
    cpSync(staticSource, path.join(target, "_next", "static"), { recursive: true });
  }

  for (const publicDir of sample.publicDirs ?? []) {
    const source = path.join(sample.source, "public", publicDir);
    if (existsSync(source)) {
      cpSync(source, path.join(target, publicDir), { recursive: true });
    }
  }
}

function writeRoutes(sample, target) {
  const appBuild = path.join(sample.source, ".next", "server", "app");

  for (const route of sample.routes) {
    const sourceFile = path.join(appBuild, `${route}.html`);
    if (!existsSync(sourceFile)) {
      throw new Error(`Missing prerendered route for ${sample.slug}: ${sourceFile}`);
    }

    const html = rewriteHtml(readFileSync(sourceFile, "utf8"), sample.slug, sample.routes);
    const routeDir = route === "index" ? target : path.join(target, route);
    ensureDir(routeDir);
    writeFileSync(path.join(routeDir, "index.html"), html);
  }
}

function reportFileCount(dir) {
  let count = 0;
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = statSync(fullPath);
    count += stat.isDirectory() ? reportFileCount(fullPath) : 1;
  }
  return count;
}

ensureDir(samplesRoot);

for (const sample of samples) {
  if (sample.manual) {
    console.log(`${sample.slug}: skipped manual sample`);
    continue;
  }

  const target = path.join(samplesRoot, sample.slug);
  rmSync(target, { recursive: true, force: true });
  ensureDir(target);
  copyStaticAssets(sample, target);
  writeRoutes(sample, target);
  console.log(`${sample.slug}: ${reportFileCount(target)} files`);
}
