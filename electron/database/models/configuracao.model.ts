import { ConfiguracaoVpn } from "./configuracaoVpn.model";

export class Configuracao {
  configuracaoId?: number;
  senhaSudo: string;
  configuracaoVpnId: number;
  configuracaoVpn?: ConfiguracaoVpn;

  constructor(senhaSudo: string = '', configuracaoVpnId: number = 0, configuracaoId?: number, configuracaoVpn?: ConfiguracaoVpn) {
    this.configuracaoId = configuracaoId;
    this.senhaSudo = senhaSudo;
    this.configuracaoVpnId = configuracaoVpnId;
    this.configuracaoVpn = configuracaoVpn;
  }

  static get tableName() {
    return 'CONFIGURACAO';
  }
}