document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("Hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // close menu after clicking a link (optional but nice)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
});
