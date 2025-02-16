import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { Configuracao } from '../../electron/database/models/configuracao.model';
import { ConfiguracaoVpn } from '../../electron/database/models/configuracaoVpn.model';
import { Provedor } from '../../electron/database/models/provedor.model';
import { UsuarioVpn } from '../../electron/database/models/usuarioVpn.model';
import { Card } from 'primeng/card';
import { LookupbasicComponent } from '../baseComponents/lookupbasic/lookupbasic.component';
import {UsuarioVpnFormComponent} from '../usuarioVpn/usuario-vpn.form/usuario-vpn.form.component';

@Component({
  selector: 'app-vpn',
  imports: [FormsModule, InputTextModule, PasswordModule, DropdownModule, ButtonModule, AutoCompleteModule, DialogModule, Card, LookupbasicComponent, UsuarioVpnFormComponent],
  templateUrl: './vpn.component.html',
  styleUrl: './vpn.component.scss'
})
export class VpnComponent implements OnInit, OnDestroy {
  configuracao: Configuracao = new Configuracao();
  configuracaoVpn: ConfiguracaoVpn = new ConfiguracaoVpn();
  provedores: Provedor[] = [];
  usuariosVpn: UsuarioVpn[] = [];
  listUsuariosVpn: UsuarioVpn[] = [];
  usuarioVpn: UsuarioVpn = new UsuarioVpn();
  dialogoUsuarioVpnVisivel: boolean = false;
  terminalOutput: string = '';
  vpnConnected: boolean = false;
  vpnStatusInterval: any;
  provedor: Provedor = new Provedor();
  display: boolean = false;

  @ViewChild('lookup') lookup!: LookupbasicComponent;
  @ViewChild('usuarioVpnForm') usuarioVpnForm!: UsuarioVpnFormComponent;
  
  data: any[] = [];
  columns: any[] = [];

  ngOnInit() {
    if (window.electronAPI) {
      window.electronAPI.onComandoOutput((data: string) => {
        this.terminalOutput += data;
      });
      this.carregarConfiguracoes();
      this.carregarConfiguracoesVpn();
      this.carregarProvedores();
      this.verificarVpnStatus();
      this.buscarUsuariosVpn(null);
      this.vpnStatusInterval = setInterval(() => {
        this.verificarVpnStatus();
      }, 5000); // Verifica o status da VPN a cada 5 segundos
    }
  }

  ngOnDestroy() {
    if (this.vpnStatusInterval) {
      clearInterval(this.vpnStatusInterval);
    }
  }

  carregarConfiguracoes() {
    if (window.electronAPI) {
      window.electronAPI.obterConfiguracoes()
        .then((configuracoes: Configuracao[]) => {
          if (configuracoes.length > 0) {
            this.configuracao = configuracoes[0];
          }
        })
        .catch((error: string) => {
          this.terminalOutput += `Erro ao obter configurações: ${error}`;
        });
    }
  }

  carregarConfiguracoesVpn() {
    if (window.electronAPI) {
      window.electronAPI.obterConfiguracoesVpn()
        .then((configuracoesVpn: ConfiguracaoVpn[]) => {
          if (configuracoesVpn.length > 0) {
            this.configuracaoVpn = configuracoesVpn[0];
          }
        })
        .catch((error: string) => {
          this.terminalOutput += `Erro ao obter configurações VPN: ${error}`;
        });
    }
  }

  carregarProvedores() {
    if (window.electronAPI) {
      window.electronAPI.obterProvedores()
        .then((provedores: Provedor[]) => {
          this.provedores = provedores;
        })
        .catch((error: string) => {
          this.terminalOutput += `Erro ao obter provedores: ${error}`;
        });
    }
  }

  buscarUsuariosVpn(event: any) {
    if (window.electronAPI) {
      window.electronAPI.obterUsuariosVpn()
        .then((usuariosVpn: UsuarioVpn[]) => {
          this.terminalOutput += `UsuarioVpn: ${JSON.stringify(usuariosVpn)}`;
          if (usuariosVpn.length > 0) {
            this.data = usuariosVpn;
            this.listUsuariosVpn = usuariosVpn;
          }
        })
        .catch((error: string) => {
          this.terminalOutput += `Erro ao obter usuários VPN: ${error}`;
        });
    }
  }

  abrirDialogoUsuarioVpn(usuarioVpn?: UsuarioVpn) {
    if (usuarioVpn) {
      this.usuarioVpn = { ...usuarioVpn };
    } else {
      this.usuarioVpn = new UsuarioVpn();
    }
    this.dialogoUsuarioVpnVisivel = true;
  }

  salvarUsuarioVpn() {
    if (window.electronAPI) {
      window.electronAPI.salvarUsuarioVpn(this.usuarioVpn)
        .then((usuarioVpnSalvo: UsuarioVpn) => {
          const index = this.usuariosVpn.findIndex(u => u.usuarioVpnId === usuarioVpnSalvo.usuarioVpnId);
          if (index !== -1) {
            this.usuariosVpn[index] = usuarioVpnSalvo;
          } else {
            this.usuariosVpn.push(usuarioVpnSalvo);
          }
          this.configuracaoVpn.usuarioVpn = usuarioVpnSalvo;
          this.dialogoUsuarioVpnVisivel = false;
        })
        .catch((error: string) => {
          this.terminalOutput += `Erro ao salvar usuário VPN: ${error}`;
        });
    }
  }

  conectar() {
    if (this.provedor.ip === '') {
      this.terminalOutput += 'Provedor não encontrado.\n';
      return;
    }

    const comando = `echo ${this.configuracao.senhaSudo} | sudo -S openfortivpn ${this.provedor.ip}:${this.provedor.porta} -u ${this.configuracaoVpn.usuarioVpn?.usuario} -p ${this.configuracaoVpn.usuarioVpn?.senha} --trusted-cert ${this.provedor.trustedCert}`;
    console.log('Comando: ', comando);
    if (window.electronAPI) {
      window.electronAPI.executarComando(comando)
        .then((output: string) => {
          this.terminalOutput += output;
          this.verificarVpnStatus();
        })
        .catch((error: string) => {
          this.terminalOutput += `Erro: ${error}`;
        });
    } else {
      this.terminalOutput = 'Electron API não disponível.';
    }
  }

  desconectar() {
    if (window.electronAPI) {
      window.electronAPI.desconectarComando(this.configuracao.senhaSudo)
        .then((message: string) => {
          this.terminalOutput += message;
          this.verificarVpnStatus();
        })
        .catch((error: string) => {
          this.terminalOutput += `Erro: ${error}`;
        });
    } else {
      this.terminalOutput = 'Electron API não disponível.';
    }
  }

  verificarVpnStatus() {
    if (this.provedor.ip === '') {
      return;
    }

    if (window.electronAPI) {
      window.electronAPI.verificarVpn(this.provedor.ip)
        .then((isConnected: boolean) => {
          this.vpnConnected = isConnected;
        })
        .catch((error: string) => {
          this.terminalOutput += `Erro ao verificar status da VPN: ${error}`;
        });
    }
  }
  openDialog() {
    this.display = true;
  }  

  onRowSelectHandler(data: any) {
    console.log('data = ', data);
    const newUsuarioVpn = new UsuarioVpn(data.USUARIO, data.SENHA, data.USUARIO_VPN_ID);
    console.log('data = ', newUsuarioVpn);
    this.usuarioVpnForm.currentUsuarioVpn = newUsuarioVpn;
    this.usuarioVpnForm.updateForm();
  }

  onRowDoubleClickHandler(data: any) {
    this.usuarioVpn.usuario = data.USUARIO;
    this.display = false;
  }

  onUsuarioVpnSalvo() {
    this.buscarUsuariosVpn(null);
  }
  
  onUsuarioVpnDeletado() {
    this.buscarUsuariosVpn(null);
  }
}