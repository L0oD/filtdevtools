const { spawn, exec } = require('child_process');

let currentProcess = null;

function registerCommandHandler(ipcMain) {
  ipcMain.handle('executar-comando', async (event, comando) => {
    console.log(`Comando recebido: ${comando}`);

    if (!comando || comando.trim() === "") {
      return "Erro: Nenhum comando fornecido.";
    }

    return new Promise((resolve, reject) => {
      currentProcess = spawn('bash', ['-c', comando], { shell: true });

      let output = '';

      currentProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        output += data.toString();
        event.sender.send('comando-output', data.toString());
      });

      currentProcess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        output += data.toString();
        event.sender.send('comando-output', data.toString());
      });

      currentProcess.on('close', (code) => {
        console.log(`Processo terminou com código ${code}`);
        currentProcess = null;
        if (code !== 0) {
          reject(`Processo terminou com código ${code}`);
        } else {
          resolve(output);
        }
      });
    });
  });

  ipcMain.handle('desconectar-comando', async (event, sudoSenha) => {
    return new Promise((resolve, reject) => {
      const comando = `echo ${sudoSenha} | sudo -S pkill openfortivpn`;
      exec(comando, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao desconectar VPN: ${stderr}`);
          reject(`Erro ao desconectar VPN: ${stderr}`);
        } else {
          console.log(`VPN desconectada: ${stdout}`);
          event.sender.send('comando-output', 'Desconectado com sucesso.');
          resolve('Desconectado com sucesso.');
        }
      });
    });
  });

  ipcMain.handle('verificar-vpn', async (event, ip) => {
    return new Promise((resolve, reject) => {
      exec('ip route', (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao verificar VPN: ${stderr}`);
          reject(`Erro ao verificar VPN: ${stderr}`);
        } else {
          const isConnected = stdout.includes(ip);
          resolve(isConnected);
        }
      });
    });
  });
}

module.exports = { registerCommandHandler };