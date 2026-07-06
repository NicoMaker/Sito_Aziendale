const nodemailer = require('nodemailer');
const config = require('../config');
const { escapeHtml } = require('../utils/helpers');

// Creazione del transporter
const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

// Verifica all'avvio (viene eseguita quando il modulo viene caricato)
transporter.verify((err) => {
  if (err) {
    console.error('❌ Errore configurazione SMTP:', err.message);
  } else {
    console.log('✅ Server SMTP pronto per l\'invio email');
  }
});

const mailFrom = `"${config.mailFrom.name}" <${config.mailFrom.email}>`;

/**
 * Invia l'email all'azienda con i dati del modulo
 */
async function inviaEmailAzienda({ nome, cognome, email, servizio, telefono, messaggio, nomeCompleto }) {
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

/**
 * Invia l'email di conferma al cliente
 */
async function inviaEmailConfermaCliente({ nome, email, servizio, messaggio }) {
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

module.exports = {
  inviaEmailAzienda,
  inviaEmailConfermaCliente,
};