import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-vpn',
  imports: [FormsModule, InputTextModule, PasswordModule, DropdownModule, ButtonModule],
  templateUrl: './vpn.component.html',
  styleUrl: './vpn.component.scss'
})
export class VpnComponent implements OnInit, OnDestroy {
  usuario: string = 'leonardo.dalmolin';
  senha: string = 'Leonardo@160896';
  sudoSenha: string = 'mishaorions2';
  selectedProvider: string = '';
  providers = [
    { label: 'Coopel', value: 'coopel' },
    { label: 'Empire', value: 'empire' },
    { label: 'Ampernet', value: 'ampernet' }
  ];
  terminalOutput: string = '';
  vpnConnected: boolean = false;
  vpnStatusInterval: any;
  ip = '187.109.105.239';

  ngOnInit() {
    if (window.electronAPI) {
      window.electronAPI.onComandoOutput((data: string) => {
        this.terminalOutput += data;
      });
      this.verificarVpnStatus();
      this.vpnStatusInterval = setInterval(() => {
        this.verificarVpnStatus();
      }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.vpnStatusInterval) {
      clearInterval(this.vpnStatusInterval);
    }
  }

  conectar() {
    const comando = `echo ${this.sudoSenha} | sudo -S openfortivpn ${this.ip}:10443 -u ${this.usuario} -p ${this.senha} --trusted-cert 734c77753790cdc9f36164652b93269c2edbb7a28580942ba7055d35cad48974a`;
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
      window.electronAPI.desconectarComando(this.sudoSenha)
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
    if (window.electronAPI) {
      window.electronAPI.verificarVpn(this.ip)
        .then((isConnected: boolean) => {
          this.vpnConnected = isConnected;
        })
        .catch((error: string) => {
          this.terminalOutput += `Erro ao verificar status da VPN: ${error}`;
        });
    }
  }
}