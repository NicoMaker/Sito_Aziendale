// ============================================================
// services/email/transporter.js — Connessione SMTP (Nodemailer)
// ============================================================
const nodemailer = require("nodemailer");
const config = require("../../config");

// Log di controllo della configurazione (utile per debug)
console.log("📧 Configurazione SMTP caricata:");
console.log("  Host    :", config.smtp.host);
console.log("  Port    :", config.smtp.port);
console.log("  Secure  :", config.smtp.secure);
console.log("  User    :", config.smtp.user);
console.log("  Mittente:", config.mailFrom.email);
console.log("  Destinatari azienda:", config.mailTo);

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
  // Timeout per evitare attese infinite
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verifica asincrona della connessione (log all'avvio)
(async function verifyTransporter() {
  try {
    await transporter.verify();
    console.log("✅ SMTP pronto: le email possono essere inviate.");
  } catch (err) {
    console.error("❌ SMTP non configurato o non raggiungibile:", err.message);
    console.error("   Verifica le credenziali nel file .env");
  }
})();

module.exports = transporter;