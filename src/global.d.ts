import { TreeNode } from "primeng/api";

export {};

declare global {
  interface Window {
    electronAPI?: {
      executarComando: (comando: string) => Promise<string>;
      listarDiretorios: () => Promise<TreeNode[]>;
      obterInfoHardware: () => Promise<any>;
      obterMemoria: () => Promise<any>;
      obterInfoNode: () => Promise<any>;
    };
  }
}