import { TreeNode } from "primeng/api";
import { Configuracao } from "../electron/database/models/configuracao.model";
import { ConfiguracaoVpn } from "../electron/database/models/configuracaoVpn.model";
import { Provedor } from "../electron/database/models/provedor.model";

export {};

declare global {
  interface Window {
    electronAPI?: {
      executarComando: (comando: string) => Promise<string>;
      onComandoOutput: (callback: (data: string) => void) => void;
      desconectarComando: (senha: string) => Promise<string>;
      listarDiretorios: () => Promise<TreeNode[]>;
      obterInfoHardware: () => Promise<any>;
      obterMemoria: () => Promise<any>;
      obterInfoNode: () => Promise<any>;
      verificarVpn: (ip: string) => Promise<boolean>;
      obterConfiguracoes: () => Promise<any>;
      obterConfiguracoesVpn: () => Promise<any>;
      obterProvedores: () => Promise<any>; 
      salvarConfiguracao: (configuracao: Configuracao) => Promise<any>;
      salvarUsuarioVpn: (usuarioVpn: any) => Promise<any>;
      obterUsuariosVpn: () => Promise<any>;
      removerUsuarioVpn: (usuarioVpnId: any) => Promise<any>;
    };
  }
}