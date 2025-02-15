const db = require('../../../database/knex');

function registerProvedorHandler(ipcMain) {
  ipcMain.handle('obter-provedores', async () => {
    try {
      const rows = await db('PROVEDOR').select('*');
      return rows;
    } catch (err) {
      console.error('Erro ao obter provedores do banco de dados:', err);
      throw new Error('Erro ao obter provedores do banco de dados.');
    }
  });
}

module.exports = { registerProvedorHandler };