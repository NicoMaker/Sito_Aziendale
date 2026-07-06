const os = require('os');
const https = require('https');

/**
 * Escape dei caratteri HTML per prevenire XSS
 */
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Ottiene l'IP locale della macchina
 */
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

/**
 * Ottiene l'IP pubblico tramite ipify.org
 */
function getPublicIP() {
  return new Promise((resolve) => {
    https
      .get('https://api.ipify.org', (resp) => {
        let data = '';
        resp.on('data', (chunk) => (data += chunk));
        resp.on('end', () => resolve(data || 'N/D'));
      })
      .on('error', () => resolve('N/D'));
  });
}

module.exports = {
  escapeHtml,
  getLocalIP,
  getPublicIP,
};