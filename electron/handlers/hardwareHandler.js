const si = require('systeminformation');

function registerHardwareHandler(ipcMain) {
  ipcMain.handle('obter-info-hardware', async () => {
    try {
      const cpu = await si.cpu();
      const mem = await si.mem();
      const osInfo = await si.osInfo();
      return { cpu, mem, osInfo };
    } catch (err) {
      throw new Error(`Erro ao obter informações sobre o hardware: ${err.message}`);
    }
  });

  ipcMain.handle('obter-memoria', async () => {
    try {
      const mem = await si.mem();
      return mem;
    } catch (err) {
      throw new Error(`Erro ao obter informações de memória: ${err.message}`);
    }
  });
}

module.exports = { registerHardwareHandler };