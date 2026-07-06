const { transporter, mailFrom } = require('./transporter');
const { escapeHtml } = require('../../utils/helpers');

async function sendCliente({ nome, email, servizio, messaggio }) {
  const htmlCliente = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; color:#1a1a2e;">
      <h2 style="color:#1a6cff;">Grazie per averci contattato, ${escapeHtml(nome)}! 🎉</h2>
      <p>Abbiamo ricevuto la tua richiesta riguardante <strong>${escapeHtml(servizio)}</strong> e ti risponderemo entro poche ore.</p>
      <p style="background:#f5f7fb; padding:16px; border-radius:8px; white-space:pre-wrap;"><strong>Il tuo messaggio:</strong><br>${escapeHtml(messaggio)}</p>
      <p>A presto,<br><strong>Il team di Nooo Agency</strong></p>
      <hr style="margin-top:24px; border:none; border-top:1px solid #eee;">
      <p style="font-size:12px; color:#888;">Questa è una email automatica di conferma, non rispondere a questo indirizzo.</p>
    </div>
  `;

  await transporter.sendMail({
    from: mailFrom,
    to: email.trim(),
    subject: 'Abbiamo ricevuto la tua richiesta — Nooo Agency',
    html: htmlCliente,
  });
}

module.exports = sendCliente;