const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
menuButton?.addEventListener("click", () => {
  const open = mobileNav?.classList.toggle("open") ?? false;
  menuButton.setAttribute("aria-expanded", String(open));
});

const languageButtons = document.querySelectorAll("[data-language-toggle]");
const translatable = document.querySelectorAll("[data-en][data-ar]");
const placeholderFields = document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]");

function applyLanguage(language) {
  const isArabic = language === "ar";
  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";

  translatable.forEach((element) => {
    element.textContent = element.dataset[isArabic ? "ar" : "en"] || "";
  });

  placeholderFields.forEach((field) => {
    field.setAttribute("placeholder", field.dataset[isArabic ? "placeholderAr" : "placeholderEn"] || "");
  });

  languageButtons.forEach((button) => {
    button.textContent = isArabic ? "English" : "عربي";
    button.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
  });

  localStorage.setItem("aster-language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
  });
});

const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
applyLanguage(requestedLanguage === "ar" || localStorage.getItem("aster-language") === "ar" ? "ar" : "en");

document.querySelector(".booking-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector(".form-note")?.removeAttribute("hidden");
});
