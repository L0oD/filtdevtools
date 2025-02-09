const db = require('../../../database/database');

function registerConfiguracaoHandler(ipcMain) {
  ipcMain.handle('obter-configuracoes', async () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM CONFIGURACAO', (err, rows) => {
        if (err) {
          console.error('Erro ao obter configurações do banco de dados:', err);
          reject('Erro ao obter configurações do banco de dados.');
        } else {
          resolve(rows);
        }
      });
    });
  });

  ipcMain.handle('salvar-configuracao', async (event, configuracao) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) AS count FROM CONFIGURACAO', (err, row) => {
        if (err) {
          console.error('Erro ao verificar registros na tabela CONFIGURACAO:', err);
          reject('Erro ao verificar registros na tabela CONFIGURACAO.');
        } else if (row.count === 0) {
          // Insere nova configuração
          db.run('INSERT INTO CONFIGURACAO (SENHA_SUDO, CONFIGURACAO_VPN_ID) VALUES (?, ?)', [configuracao.senhaSudo, configuracao.configuracaoVpnId], (err) => {
            if (err) {
              console.error('Erro ao inserir configuração no banco de dados:', err);
              reject('Erro ao inserir configuração no banco de dados.');
            } else {
              resolve();
            }
          });
        } else {
          // Atualiza configuração existente
          db.run('UPDATE CONFIGURACAO SET SENHA_SUDO = ?, CONFIGURACAO_VPN_ID = ? WHERE CONFIGURACAO_ID = 1', [configuracao.senhaSudo, configuracao.configuracaoVpnId], (err) => {
            if (err) {
              console.error('Erro ao atualizar configuração no banco de dados:', err);
              reject('Erro ao atualizar configuração no banco de dados.');
            } else {
              resolve();
            }
          });
        }
      });
    });
  });
}

module.exports = { registerConfiguracaoHandler };