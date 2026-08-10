(function () {
  var TITLE = "Safa صَفاء";
  var ICON = "/favicon.png";
  var applying = false;
  var observer;

  function ensureDescription() {
    var metas = Array.prototype.slice.call(
      document.head.querySelectorAll('meta[name="description"]')
    );
    var meta = metas[0] || document.createElement("meta");

    if (meta.getAttribute("name") !== "description") {
      meta.setAttribute("name", "description");
    }
    if (meta.getAttribute("content") !== TITLE) {
      meta.setAttribute("content", TITLE);
    }

    if (!meta.parentNode) {
      document.head.appendChild(meta);
    }

    metas.slice(1).forEach(function (node) {
      node.remove();
    });
  }

  function ensureIcon() {
    var links = Array.prototype.slice.call(
      document.head.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]')
    );
    var icon =
      links.find(function (link) {
        return link.getAttribute("href") === ICON;
      }) ||
      links[0] ||
      document.createElement("link");

    if (icon.getAttribute("rel") !== "icon") {
      icon.setAttribute("rel", "icon");
    }
    if (icon.getAttribute("href") !== ICON) {
      icon.setAttribute("href", ICON);
    }
    if (icon.getAttribute("sizes") !== "512x512") {
      icon.setAttribute("sizes", "512x512");
    }
    if (icon.getAttribute("type") !== "image/png") {
      icon.setAttribute("type", "image/png");
    }

    if (!icon.parentNode) {
      document.head.appendChild(icon);
    }

    links.forEach(function (link) {
      if (link !== icon) {
        link.remove();
      }
    });
  }

  function applySafaTabMeta() {
    if (applying || !document.head) {
      return;
    }

    applying = true;
    if (document.title !== TITLE) {
      document.title = TITLE;
    }
    ensureDescription();
    ensureIcon();
    applying = false;
  }

  function observeHead() {
    if (!observer || !document.head) {
      return;
    }

    observer.observe(document.head, {
      attributes: true,
      attributeFilter: ["content", "href", "rel"],
      characterData: true,
      childList: true,
      subtree: true,
    });
  }

  applySafaTabMeta();
  document.addEventListener("DOMContentLoaded", applySafaTabMeta);
  window.addEventListener("load", applySafaTabMeta);

  [50, 250, 900, 1800, 3200].forEach(function (delay) {
    window.setTimeout(applySafaTabMeta, delay);
  });

  if (window.MutationObserver && document.head) {
    var scheduled = 0;
    observer = new MutationObserver(function () {
      if (applying) {
        return;
      }

      window.clearTimeout(scheduled);
      scheduled = window.setTimeout(function () {
        observer.disconnect();
        applySafaTabMeta();
        observeHead();
      }, 0);
    });

    observeHead();
    window.setTimeout(function () {
      observer.disconnect();
    }, 4200);
  }
})();
