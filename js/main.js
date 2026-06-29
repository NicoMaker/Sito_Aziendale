/* ============================================
   main.js — Entry point: coordina tutti i moduli
   ============================================ */

import { loadAllData }   from "./data.js";
import { initNav }       from "./nav.js";
import { initReveal }    from "./reveal.js";
import { renderProgetti, renderServizi, renderContatti } from "./render.js";

(async function () {
  "use strict";

  /* Navbar e reveal partono subito (non servono dati) */
  initNav();
  const revealIO = initReveal();

  /* Carica dati e popola il DOM */
  try {
    const { siteData, progettiData, serviziData } = await loadAllData();
    renderProgetti(progettiData, revealIO);
    renderServizi(serviziData, revealIO);
    renderContatti(siteData, revealIO);
  } catch (err) {
    console.error("Errore caricamento dati:", err);
  }
})();
