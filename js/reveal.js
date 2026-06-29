/* ============================================
   reveal.js — Scroll reveal con IntersectionObserver
   ============================================ */

export function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  /* Osserva tutti gli elementi .reveal già presenti */
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* Torna l'observer così render.js può aggiungere nuovi elementi */
  return io;
}
