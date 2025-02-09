const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  executarComando: (comando) => ipcRenderer.invoke('executar-comando', comando),
  onComandoOutput: (callback) => ipcRenderer.on('comando-output', (event, data) => callback(data)),
  verificarVpn: (ip) => ipcRenderer.invoke('verificar-vpn', ip), 
  desconectarComando: (sudoSenha) => ipcRenderer.invoke('desconectar-comando', sudoSenha),
  listarDiretorios: () => ipcRenderer.invoke("listar-diretorios"),
  obterInfoHardware: () => ipcRenderer.invoke("obter-info-hardware"),
  obterMemoria: () => ipcRenderer.invoke("obter-memoria"),
  obterInfoNode: () => ipcRenderer.invoke('obter-info-node'),
  //dbHandlers
  obterConfiguracoes: () => ipcRenderer.invoke('obter-configuracoes'),
  salvarConfiguracao: (configuracao) => ipcRenderer.invoke('salvar-configuracao', configuracao),
  obterConfiguracoesVpn: () => ipcRenderer.invoke('obter-configuracoes-vpn'), 
  obterProvedores: () => ipcRenderer.invoke('obter-provedores'),
});
