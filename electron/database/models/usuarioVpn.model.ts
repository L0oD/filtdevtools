export class UsuarioVpn {
    usuarioVpnId?: number;
    usuario: string;
    senha: string;
  
    constructor(usuario: string = '', senha: string = '', usuarioVpnId?: number) {
      this.usuarioVpnId = usuarioVpnId;
      this.usuario = usuario;
      this.senha = senha;
    }
  
    static get tableName() {
      return 'USUARIO_VPN';
    }
  }

  