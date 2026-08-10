const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
menuButton?.addEventListener("click", () => {
  const open = mobileNav?.classList.toggle("open") ?? false;
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelector(".booking-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector(".form-note")?.removeAttribute("hidden");
});
