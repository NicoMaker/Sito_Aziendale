/**
 * Middleware di gestione errori centralizzata
 * (attualmente non utilizzato esplicitamente, ma app.js lo include)
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error('❌ Errore generico:', err);
  res.status(500).json({
    ok: false,
    errori: ['Si è verificato un errore interno. Riprova più tardi.'],
  });
}

module.exports = errorHandler;