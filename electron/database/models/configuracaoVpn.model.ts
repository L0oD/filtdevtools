export class ConfiguracaoVpn {
  configuracaoVpnId?: number;
  usuario: string;
  senha: string;
  conectarAuto: boolean;
  provedorId: number;

  constructor(usuario: string = '', senha: string = '', conectarAuto: boolean = false, provedorId: number = 0, configuracaoVpnId?: number) {
    this.configuracaoVpnId = configuracaoVpnId;
    this.usuario = usuario;
    this.senha = senha;
    this.conectarAuto = conectarAuto;
    this.provedorId = provedorId;
  }

  static get tableName() {
    return 'CONFIGURACAO_VPN';
  }
}