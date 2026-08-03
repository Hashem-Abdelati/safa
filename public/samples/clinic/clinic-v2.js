(() => {
  const root = document.body;
  const toggle = document.querySelector("[data-language-toggle]");
  const menu = document.querySelector("[data-menu-toggle]");
  const mobile = document.querySelector("[data-mobile-nav]");
  toggle?.addEventListener("click", () => {
    const next = root.dataset.lang === "ar" ? "en" : "ar";
    root.dataset.lang = next;
    document.documentElement.lang = next;
    toggle.textContent = next === "ar" ? "English" : "العربية";
  });
  menu?.addEventListener("click", () => mobile?.classList.toggle("open"));
  document.querySelector("[data-demo-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("[data-form-status]");
    if (status) {
      status.hidden = false;
      status.focus?.();
    }
  });
})();