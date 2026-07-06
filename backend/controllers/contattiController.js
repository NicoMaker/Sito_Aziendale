const { validaForm } = require('../utils/validators');
const { inviaEmailAzienda, inviaEmailConfermaCliente } = require('../services/emailService');
const config = require('../config');

exports.inviaFormContatti = async (req, res) => {
  try {
    const { nome, cognome, email, servizio, telefono, messaggio } = req.body;

    // Validazione
    const errori = validaForm(req.body);
    if (errori.length) {
      return res.status(400).json({ ok: false, errori });
    }

    const nomeCompleto = `${nome.trim()} ${cognome.trim()}`;

    // Invio email all'azienda
    await inviaEmailAzienda({
      nome,
      cognome,
      email,
      servizio,
      telefono,
      messaggio,
      nomeCompleto,
    });

    // Invio email di conferma al cliente
    await inviaEmailConfermaCliente({
      nome,
      cognome,
      email,
      servizio,
      messaggio,
    });

    return res.json({
      ok: true,
      message: 'Messaggio inviato con successo! Ti risponderemo al più presto.',
    });
  } catch (err) {
    console.error('❌ Errore invio email:', err);
    // L'errore verrà passato al middleware di error handling grazie al next,
    // ma per semplicità lo gestiamo qui.
    return res.status(500).json({
      ok: false,
      errori: [
        'Si è verificato un errore durante l\'invio. Riprova più tardi o contattaci telefonicamente.',
      ],
    });
  }
};