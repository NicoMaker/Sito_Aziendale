/* ============================================
   nav.js — Navbar: scroll, hamburger overlay,
             active link, menu a tendina
   ============================================ */

export function initNav() {
  const navbar   = document.querySelector("#navbar");
  const hamburger = document.querySelector(".hamburger");
  const navMobile = document.querySelector(".nav-mobile");
  const mobileLinks = document.querySelectorAll(".nav-mobile a");

  /* ---- Scroll: sfondo navbar ---- */
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });

  /* ---- Hamburger toggle ---- */
  function openMenu() {
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    navMobile.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    navMobile.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    hamburger.classList.contains("open") ? closeMenu() : openMenu();
  });

  /* ---- Chiudi cliccando un link ---- */
  mobileLinks.forEach((a) => a.addEventListener("click", closeMenu));

  /* ---- Chiudi premendo Escape ---- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Active link on scroll ---- */
  const sections  = [...document.querySelectorAll("section[id]")];
  const navLinks  = [...document.querySelectorAll(".nav-links a[href^='#']")];

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("active"));
          const active = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => io.observe(s));
}
