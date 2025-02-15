const db = require('../../../database/knex');

function registerConfiguracaoVpnHandler(ipcMain) {
  ipcMain.handle('obter-configuracoes-vpn', async () => {
    try {
      const rows = await db('CONFIGURACAO_VPN').select('*');
      return rows;
    } catch (err) {
      console.error('Erro ao obter configurações VPN do banco de dados:', err);
      throw new Error('Erro ao obter configurações VPN do banco de dados.');
    }
  });
}

module.exports = { registerConfiguracaoVpnHandler };