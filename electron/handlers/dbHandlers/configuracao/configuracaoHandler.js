const db = require('../../../database/knex');

function registerConfiguracaoHandler(ipcMain) {
  ipcMain.handle('obter-configuracoes', async () => {
    try {
      const rows = await db('CONFIGURACAO')
        .join('CONFIGURACAO_VPN', 'CONFIGURACAO.CONFIGURACAO_VPN_ID', 'CONFIGURACAO_VPN.CONFIGURACAO_VPN_ID')
        .select('CONFIGURACAO.*', 'CONFIGURACAO_VPN.*');
      return rows;
    } catch (err) {
      console.error('Erro ao obter configurações do banco de dados:', err);
      throw new Error('Erro ao obter configurações do banco de dados.');
    }
  });

  ipcMain.handle('salvar-configuracao', async (event, configuracao) => {
    try {
      const count = await db('CONFIGURACAO').count('* as count').first();
      if (count.count === 0) {
        await db('CONFIGURACAO').insert({
          SENHA_SUDO: configuracao.senhaSudo,
          CONFIGURACAO_VPN_ID: configuracao.configuracaoVpnId
        });
      } else {
        await db('CONFIGURACAO').update({
          SENHA_SUDO: configuracao.senhaSudo,
          CONFIGURACAO_VPN_ID: configuracao.configuracaoVpnId
        }).where('CONFIGURACAO_ID', 1);
      }
    } catch (err) {
      console.error('Erro ao salvar configuração no banco de dados:', err);
      throw new Error('Erro ao salvar configuração no banco de dados.');
    }
  });
}

module.exports = { registerConfiguracaoHandler };