(function () {
  function ensureMobileMenuButton() {
    var header = document.querySelector(".header");
    var nav = document.querySelector(".nav");
    if (!header || !nav) {
      return;
    }

    var button = header.querySelector(".safa-mobile-menu-button");
    if (!button) {
      button = document.createElement("button");
      button.className = "safa-mobile-menu-button";
      button.type = "button";
      button.innerHTML = "<span></span>";
      header.appendChild(button);
    }

    if (button.getAttribute("data-safa-menu-ready") === "true") {
      return;
    }

    button.setAttribute("data-safa-menu-ready", "true");
    button.setAttribute("aria-label", "Open menu");
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var open = nav.classList.toggle("nav--open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target && event.target.closest && event.target.closest("a")) {
        nav.classList.remove("nav--open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open menu");
      }
    });

  }

  function injectMobilePerformanceSection() {
    if (!/\/samples\/noor\/case-study\/index\.html$/.test(window.location.pathname)) {
      return;
    }
    if (document.querySelector(".safa-mobile-performance")) {
      return;
    }

    var anchor = document.querySelector(".case-content");
    if (!anchor || !anchor.parentNode) {
      return;
    }

    var section = document.createElement("section");
    section.className = "safa-mobile-performance";
    section.innerHTML = [
      '<div class="container safa-mobile-performance__grid">',
      '<div>',
      '<p class="kicker">Mobile-first performance</p>',
      "<h2>Designed for the moment guests decide.</h2>",
      "</div>",
      '<div class="safa-mobile-performance__copy">',
      "<p>Restaurant traffic is heavily mobile. Guests often arrive while choosing where to eat, checking the menu, calling, booking, or getting directions. The experience has to work fast, clearly, and with one hand.</p>",
      "<p>For NOOR, the important actions stay close: menu, reservations, call, location, and hours. Pages are kept direct, fonts stay readable without zooming, and the mobile rail keeps booking and calling available without hunting through the page.</p>",
      '<div class="safa-mobile-performance__requirements" aria-label="Restaurant mobile website requirements">',
      "<span>Sub-2-second load target</span>",
      "<span>Mobile-responsive layout</span>",
      "<span>Large, readable fonts</span>",
      "<span>Persistent ordering and booking access</span>",
      "</div>",
      "</div>",
      "</div>",
    ].join("");

    anchor.insertAdjacentElement("afterend", section);
  }

  function getCurrentLanguage() {
    try {
      var stored = window.localStorage && window.localStorage.getItem("noor-language");
      if (stored === "ar" || stored === "en") {
        return stored;
      }
    } catch (error) {}

    return document.documentElement.dir === "rtl" || document.documentElement.lang === "ar" ? "ar" : "en";
  }

  function ensureLanguageToggle() {
    var button = document.querySelector(".language");
    if (!button || button.getAttribute("data-safa-language-ready") === "true") {
      return;
    }

    button.setAttribute("data-safa-language-ready", "true");
    button.addEventListener("click", function () {
      var previous = getCurrentLanguage();

      window.setTimeout(function () {
        if (getCurrentLanguage() !== previous) {
          return;
        }

        var next = previous === "ar" ? "en" : "ar";
        try {
          window.localStorage.setItem("noor-language", next);
        } catch (error) {}

        window.location.reload();
      }, 120);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      ensureMobileMenuButton();
      injectMobilePerformanceSection();
      ensureLanguageToggle();
    });
  } else {
    ensureMobileMenuButton();
    injectMobilePerformanceSection();
    ensureLanguageToggle();
  }
  window.addEventListener("load", ensureMobileMenuButton);
  window.addEventListener("load", injectMobilePerformanceSection);
  window.addEventListener("load", ensureLanguageToggle);
  window.setTimeout(ensureMobileMenuButton, 150);
  window.setTimeout(ensureMobileMenuButton, 700);
  window.setTimeout(ensureMobileMenuButton, 1600);
  window.setTimeout(ensureLanguageToggle, 150);
  window.setTimeout(ensureLanguageToggle, 700);
  window.setTimeout(ensureLanguageToggle, 1600);
  if (window.MutationObserver) {
    new MutationObserver(function () {
      ensureMobileMenuButton();
      ensureLanguageToggle();
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
