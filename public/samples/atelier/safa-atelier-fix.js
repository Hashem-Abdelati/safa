(function () {
  var sampleBase = "/samples/atelier";
  var routes = {
    "/": "/index.html",
    "/shop": "/shop/index.html",
    "/new-arrivals": "/new-arrivals/index.html",
    "/lookbook": "/lookbook/index.html",
    "/style-room": "/style-room/index.html",
    "/about": "/about/index.html",
    "/contact": "/contact/index.html",
    "/cart": "/cart/index.html",
    "/checkout": "/checkout/index.html",
    "/case-study": "/case-study/index.html"
  };

  function samplePath(pathname) {
    if (pathname.indexOf(sampleBase) === 0) return pathname;
    if (pathname.indexOf("/product/") === 0) return sampleBase + "/shop/index.html";
    if (routes[pathname]) return sampleBase + routes[pathname];
    return pathname;
  }

  function normalizeUrl(href) {
    var url = new URL(href, window.location.href);
    url.pathname = samplePath(url.pathname);
    return url;
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var anchor = target.closest("a[href]");
    if (!anchor) return;

    var href = anchor.getAttribute("href");
    if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return;

    try {
      var url = normalizeUrl(href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname.indexOf(sampleBase) !== 0) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      if (anchor.target === "_blank") {
        window.open(url.href, "_blank", "noopener,noreferrer");
        return;
      }
      window.location.assign(url.href);
    } catch (error) {}
  }, true);

  function repairImage(image) {
    var src = image.currentSrc || image.src || "";
    if (src.indexOf("/_next/image?") !== -1) {
      try {
        var optimized = new URL(src, window.location.href);
        var original = optimized.searchParams.get("url");
        if (original) image.src = decodeURIComponent(original);
      } catch (error) {}
    }
    if (image.getAttribute("src") && image.getAttribute("src").indexOf("/editorial/") === 0) {
      image.src = sampleBase + image.getAttribute("src");
    }
  }

  window.addEventListener("error", function (event) {
    if (event.target && event.target.tagName === "IMG") repairImage(event.target);
  }, true);

  function recoverOnce(reason) {
    var key = "safa-atelier-recovered:" + window.location.pathname + window.location.search;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, reason || "runtime");
    } catch (error) {
      if (window.__safaAtelierRecovered) return;
      window.__safaAtelierRecovered = true;
    }
    window.location.reload();
  }

  function shouldRecover(message) {
    return /ChunkLoadError|Loading chunk|missing.*chunk|Minified React error|hydration|client-side exception/i.test(message || "");
  }

  window.addEventListener("error", function (event) {
    if (event.target && event.target.tagName) return;
    var message = event.message || (event.error && event.error.message) || "";
    if (shouldRecover(message)) recoverOnce(message);
  });

  window.addEventListener("unhandledrejection", function (event) {
    var reason = event.reason || {};
    var message = reason.message || String(reason);
    if (shouldRecover(message)) recoverOnce(message);
  });
})();
