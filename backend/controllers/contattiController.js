const { validaForm } = require('../utils/validators');
const { sendAzienda, sendCliente } = require('../services/email');

exports.inviaFormContatti = async (req, res) => {
  try {
    const { nome, cognome, email, servizio, telefono, messaggio } = req.body;

    const errori = validaForm(req.body);
    if (errori.length) {
      return res.status(400).json({ ok: false, errori });
    }

    const nomeCompleto = `${nome.trim()} ${cognome.trim()}`;

    // Invio all'azienda
    await sendAzienda({ nome, cognome, email, servizio, telefono, messaggio, nomeCompleto });

    // Invio di conferma al cliente
    await sendCliente({ nome, email, servizio, messaggio });

    return res.json({
      ok: true,
      message: 'Messaggio inviato con successo! Ti risponderemo al più presto.',
    });
  } catch (err) {
    console.error('❌ Errore invio email:', err);
    return res.status(500).json({
      ok: false,
      errori: [
        'Si è verificato un errore durante l\'invio. Riprova più tardi o contattaci telefonicamente.',
      ],
    });
  }
};