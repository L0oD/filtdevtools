const { exec } = require('child_process');

function registerCommandHandler(ipcMain) {
  ipcMain.handle('executar-comando', async (event, comando) => {
    console.log(`Comando recebido: ${comando}`);

    if (!comando || comando.trim() === "") {
      return "Erro: Nenhum comando fornecido.";
    }

    return new Promise((resolve, reject) => {
      exec(comando, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar comando: ${stderr}`);
          reject(`Erro ao executar comando: ${stderr}`);
        } else {
          console.log(`Saída do comando: ${stdout}`);
          resolve(stdout);
        }
      });
    });
  });
}

module.exports = { registerCommandHandler };