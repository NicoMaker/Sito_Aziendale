// ============================================================
// nav.js — Navbar sticky, menu mobile, evidenziazione sezione
// ============================================================

function initNav() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".nav-mobile");

  // Navbar compatta allo scroll
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const toggleMenu = (open) => {
    const isOpen =
      open !== undefined ? open : !mobileNav.classList.contains("open");
    mobileNav.classList.toggle("open", isOpen);
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  hamburger.addEventListener("click", () => toggleMenu());
  mobileNav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  // ── Evidenzia link attivo ──────────────────────────────────
  const path = window.location.pathname;
  const isHome = path.endsWith("index.html") || path === "/" || path === "";

  if (isHome) {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-links a");

    // Imposta il link attivo in base all'hash all'avvio
    const setActiveFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        links.forEach((l) => {
          const href = l.getAttribute("href");
          if (href && href.split("#")[1] === hash) {
            l.classList.add("active");
          } else {
            l.classList.remove("active");
          }
        });
      }
    };
    setActiveFromHash();

    // Osservatore per lo scroll – con soglia più permissiva
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => {
            const href = l.getAttribute("href");
            if (href) {
              const targetId = href.split("#")[1];
              // Aggiunge/rimuove la classe active in base all'ID
              l.classList.toggle("active", targetId === entry.target.id);
            }
          });
        });
      },
      // Soglia: almeno il 30% della sezione deve essere visibile
      { threshold: 0.3 }
    );

    sections.forEach((s) => spy.observe(s));
  } else {
    // Su pagine secondarie (es. servizio.html): evidenzia "Servizi"
    const serviziLink = document.querySelector('.nav-links a[href*="servizi"]');
    if (serviziLink) serviziLink.classList.add("active");
  }
}