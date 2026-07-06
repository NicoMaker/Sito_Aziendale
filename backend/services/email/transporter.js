const nodemailer = require('nodemailer');
const config = require('../../config');

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

// Verifica all'avvio
transporter.verify((err) => {
  if (err) {
    console.error('❌ Errore configurazione SMTP:', err.message);
  } else {
    console.log('✅ Server SMTP pronto per l\'invio email');
  }
});

const mailFrom = `"${config.mailFrom.name}" <${config.mailFrom.email}>`;

module.exports = {
  transporter,
  mailFrom,
};