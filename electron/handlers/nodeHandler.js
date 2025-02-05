const { exec } = require('child_process');

function registerNodeHandler(ipcMain) {
  ipcMain.handle('obter-info-node', async () => {
    try {
      const nodeVersion = await execPromise('node -v');
      const npmVersion = await execPromise('npm -v');

      return {
        nodeVersion: nodeVersion.trim(),
        npmVersion: npmVersion.trim(),
      };
    } catch (err) {
      console.error(`Erro ao obter informações sobre o Node.js: ${err.message}`);
      throw new Error(`Erro ao obter informações sobre o Node.js: ${err.message}`);
    }
  });
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar comando "${command}": ${stderr}`);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

module.exports = { registerNodeHandler };