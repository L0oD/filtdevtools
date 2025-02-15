export class Provedor {
  provedorId?: number;
  ip: string;
  nome: string;
  porta: string;
  trustedCert: string;

  constructor(ip: string = '', nome: string = '', porta: string = '', trustedCert: string = '', provedorId?: number) {
    this.provedorId = provedorId;
    this.ip = ip;
    this.nome = nome;
    this.porta = porta;
    this.trustedCert = trustedCert;
  }

  static get tableName() {
    return 'PROVEDOR';
  }
}