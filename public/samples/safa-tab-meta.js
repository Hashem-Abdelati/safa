(function () {
  var TITLE = "Safa صَفاء";
  var ICON = "/favicon.png";
  var applying = false;

  function ensureDescription() {
    var metas = Array.prototype.slice.call(
      document.head.querySelectorAll('meta[name="description"]')
    );
    var meta = metas[0] || document.createElement("meta");

    meta.setAttribute("name", "description");
    meta.setAttribute("content", TITLE);

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

    icon.setAttribute("rel", "icon");
    icon.setAttribute("href", ICON);
    icon.setAttribute("sizes", "512x512");
    icon.setAttribute("type", "image/png");

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
    document.title = TITLE;
    ensureDescription();
    ensureIcon();
    applying = false;
  }

  applySafaTabMeta();
  document.addEventListener("DOMContentLoaded", applySafaTabMeta);
  window.addEventListener("load", applySafaTabMeta);

  [50, 250, 900, 1800].forEach(function (delay) {
    window.setTimeout(applySafaTabMeta, delay);
  });

  if (window.MutationObserver && document.head) {
    var scheduled = 0;
    var observer = new MutationObserver(function () {
      if (applying) {
        return;
      }

      window.clearTimeout(scheduled);
      scheduled = window.setTimeout(applySafaTabMeta, 0);
    });

    observer.observe(document.head, {
      attributes: true,
      attributeFilter: ["content", "href", "rel"],
      characterData: true,
      childList: true,
      subtree: true,
    });
  }
})();
