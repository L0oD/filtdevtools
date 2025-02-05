const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  executarComando: (comando) => ipcRenderer.invoke("executar-comando", comando),
  listarDiretorios: () => ipcRenderer.invoke("listar-diretorios"),
  obterInfoHardware: () => ipcRenderer.invoke("obter-info-hardware"),
  obterMemoria: () => ipcRenderer.invoke("obter-memoria"),
  obterInfoNode: () => ipcRenderer.invoke('obter-info-node'),
});
