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
import {InputAndLookupCrudComponent} from '../usuarioVpn/input-and-lookup-crud-usuario-vpn/input-and-lookup-crud-usuario-vpn.component';
@Component({
  selector: 'app-vpn',
  imports: [InputAndLookupCrudComponent,FormsModule, InputTextModule, PasswordModule, DropdownModule, ButtonModule, AutoCompleteModule, DialogModule, Card],
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
  terminalOutput: string = '';
  vpnConnected: boolean = false;
  vpnStatusInterval: any;
  provedor: Provedor = new Provedor();

  

  ngOnInit() {
    if (window.electronAPI) {
      window.electronAPI.onComandoOutput((data: string) => {
        this.terminalOutput += data;
      });
      this.carregarConfiguracoes();
      this.carregarConfiguracoesVpn();
      this.carregarProvedores();
      this.verificarVpnStatus();
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
  
}