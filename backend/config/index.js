// ============================================================
// config/index.js — Configurazione centralizzata (da .env)
// ============================================================
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,

  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 465,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  mailFrom: {
    name: process.env.MAIL_FROM_NAME || "T-DS Agency",
    email: process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER,
  },

  // Trasforma MAIL_TO in array di stringhe, escludendo valori vuoti
  mailTo: (process.env.MAIL_TO || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean),

  corsOrigin: process.env.CORS_ORIGIN || "*",

  azienda: {
    nome: process.env.AZIENDA_NOME || "T-DS Agency",
    email: process.env.AZIENDA_EMAIL || process.env.SMTP_USER,
    sito: process.env.AZIENDA_SITO || "www.tdsagency.it",
  },
};
