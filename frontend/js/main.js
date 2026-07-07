// ============================================================
// main.js — Entry point del sito
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  initNav();

  try {
    const { site, servizi, progetti, video } = await SiteData.loadAll();

    window.API_URL = site.azienda.apiUrl || '/api/contatti';

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