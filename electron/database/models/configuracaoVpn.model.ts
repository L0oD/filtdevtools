import { UsuarioVpn } from './usuarioVpn.model';
export class ConfiguracaoVpn {
  configuracaoVpnId?: number;
  conectarAuto: boolean;
  provedorId: number;
  usuarioVpnId: number;
  usuarioVpn?: UsuarioVpn;

  constructor(conectarAuto: boolean = false, provedorId: number = 0, usuarioVpnId: number = 0, configuracaoVpnId?: number, usuarioVpn?: UsuarioVpn) {
    this.configuracaoVpnId = configuracaoVpnId;
    this.conectarAuto = conectarAuto;
    this.provedorId = provedorId;
    this.usuarioVpnId = usuarioVpnId;
    this.usuarioVpn = usuarioVpn;
  }

  static get tableName() {
    return 'CONFIGURACAO_VPN';
  }
}