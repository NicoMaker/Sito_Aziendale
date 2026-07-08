// ============================================================
// services/email/sendCliente.js — Conferma automatica al cliente
// ============================================================
const transporter = require("./transporter");
const config = require("../../config");
const { templateCliente } = require("./templates");

async function sendCliente(dati) {
  try {
    if (!dati.email) {
      throw new Error("Email del cliente non fornita");
    }

    const info = await transporter.sendMail({
      from: `"${config.mailFrom.name}" <${config.mailFrom.email}>`,
      to: dati.email,
      subject: dati.servizio
        ? `Abbiamo ricevuto la tua richiesta per ${dati.servizio} — ${config.azienda.nome}`
        : `Abbiamo ricevuto la tua richiesta — ${config.azienda.nome}`,
      html: templateCliente(dati),
    });

    console.log("✅ Email cliente inviata a:", dati.email);
    console.log("📧 Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ ERRORE invio email cliente:", error.message);
    console.error("📋 Dettaglio:", error);
    throw error;
  }
}

module.exports = sendCliente;