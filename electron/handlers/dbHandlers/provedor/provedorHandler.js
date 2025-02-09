const db = require('../../../database/database');

function registerProvedorHandler(ipcMain) {
  ipcMain.handle('obter-provedores', async () => {
    console.log('obter-provedores')
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM PROVEDOR', (err, rows) => {
        if (err) {
          console.error('Erro ao obter provedores do banco de dados:', err);
          reject('Erro ao obter provedores do banco de dados.');
        } else {
          console.log('obter-provedores '+rows)
          resolve(rows);
        }
      });
    });
  });
}

module.exports = { registerProvedorHandler };