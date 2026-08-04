(() => {
  const menu = document.querySelector("[data-menu-toggle]");
  const mobile = document.querySelector("[data-mobile-nav]");
  menu?.addEventListener("click", () => mobile?.classList.toggle("open"));
  document.querySelector("[data-demo-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("[data-form-status]");
    if (status) status.hidden = false;
  });
})();
