const { transporter, mailFrom } = require('./transporter');
const config = require('../../config');
const { escapeHtml } = require('../../utils/helpers');

async function sendAzienda({ nome, cognome, email, servizio, telefono, messaggio, nomeCompleto }) {
  const htmlAzienda = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; color:#1a1a2e;">
      <h2 style="color:#1a6cff;">📩 Nuova richiesta dal sito Nooo Agency</h2>
      <table style="width:100%; border-collapse:collapse; margin-top:16px;">
        <tr><td style="padding:8px; font-weight:bold; width:160px;">Nome:</td><td style="padding:8px;">${escapeHtml(nome)}</td></tr>
        <tr style="background:#f5f7fb;"><td style="padding:8px; font-weight:bold;">Cognome:</td><td style="padding:8px;">${escapeHtml(cognome)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${escapeHtml(email)}</td></tr>
        <tr style="background:#f5f7fb;"><td style="padding:8px; font-weight:bold;">Telefono:</td><td style="padding:8px;">${escapeHtml(telefono)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Servizio desiderato:</td><td style="padding:8px;">${escapeHtml(servizio)}</td></tr>
      </table>
      <h3 style="margin-top:24px; color:#1a6cff;">Messaggio:</h3>
      <p style="background:#f5f7fb; padding:16px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(messaggio)}</p>
      <hr style="margin-top:24px; border:none; border-top:1px solid #eee;">
      <p style="font-size:12px; color:#888;">Inviato automaticamente dal form contatti del sito noooagency.com</p>
    </div>
  `;

  await transporter.sendMail({
    from: mailFrom,
    to: config.mailTo,
    replyTo: email.trim(),
    subject: `🌐 Nuova richiesta: ${servizio} — ${nomeCompleto}`,
    html: htmlAzienda,
  });
}

module.exports = sendAzienda;