/**
 * Valida i campi del form contatti
 * @param {Object} body - req.body
 * @returns {string[]} array di messaggi di errore
 */
function validaForm(body) {
  const errori = [];
  const campiObbligatori = {
    nome: 'Nome',
    cognome: 'Cognome',
    email: 'Email',
    servizio: 'Servizio desiderato',
    telefono: 'Numero di cellulare',
    messaggio: 'Messaggio',
  };

  for (const [campo, label] of Object.entries(campiObbligatori)) {
    if (!body[campo] || !String(body[campo]).trim()) {
      errori.push(`Il campo "${label}" è obbligatorio.`);
    }
  }

  // Validazione email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (body.email && !emailRegex.test(body.email.trim())) {
    errori.push("L'indirizzo email non è valido.");
  }

  // Validazione telefono (numeri, spazi, +, -, parentesi — minimo 6 cifre)
  const telefonoDigits = body.telefono ? body.telefono.replace(/\D/g, '') : '';
  if (body.telefono && telefonoDigits.length < 6) {
    errori.push('Il numero di cellulare non è valido.');
  }

  return errori;
}

module.exports = {
  validaForm,
};