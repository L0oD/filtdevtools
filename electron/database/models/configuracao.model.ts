export class Configuracao {
  configuracaoId?: number;
  senhaSudo: string;
  configuracaoVpnId: number;

  constructor(senhaSudo: string = '', configuracaoVpnId: number = 0, configuracaoId?: number) {
    this.configuracaoId = configuracaoId;
    this.senhaSudo = senhaSudo;
    this.configuracaoVpnId = configuracaoVpnId;
  }
}