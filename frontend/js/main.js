// ============================================================
// main.js — Entry point del sito
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  // initNav() viene chiamata dopo il rendering, non qui

  try {
    const { site, servizi, progetti, video } = await SiteData.loadAll();

    window.API_URL = site.azienda.apiUrl || "/api/contatti";

    renderMarquee(servizi);
    renderServizi(servizi);
    renderProgetti(progetti);
    renderVideo(video);
    renderTeam(site);
    renderFooterSocial(site);

    initFilterGrid({
      grid: document.getElementById("progetti-grid"),
      searchInput: document.getElementById("progetti-search"),
      catWrap: document.getElementById("progetti-categorie"),
      emptyEl: document.getElementById("progetti-empty"),
      cardSelector: ".progetto-card",
    });

    FormContatti.init();
  } catch (err) {
    console.error("Errore nel caricamento dei dati del sito:", err);
  } finally {
    // Ora le sezioni sono state generate, possiamo inizializzare la navigazione
    initNav();
    initReveal();
    initCounters();
    initParallax();
    initMagneticButtons();
    initHeroGlow();
    hidePageLoader();
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
});
