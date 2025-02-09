const db = require('../../../database/database');

function registerConfiguracaoVpnHandler(ipcMain) {
  ipcMain.handle('obter-configuracoes-vpn', async () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM CONFIGURACAO_VPN', (err, rows) => {
        if (err) {
          console.error('Erro ao obter configurações VPN do banco de dados:', err);
          reject('Erro ao obter configurações VPN do banco de dados.');
        } else {
          resolve(rows);
        }
      });
    });
  });
}

module.exports = { registerConfiguracaoVpnHandler };