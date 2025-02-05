import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; // Adicione esta linha

@Component({
  selector: 'app-home',
  imports: [CommonModule,
      InputTextModule,
      ButtonModule,
      MessageModule,
      FormsModule,
      CardModule], // Adicione esta linha
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  text = '';
  msg = '';
  comando: string = '';
  output: string = '';
  hardwareInfo: any = {}; // Adicione esta linha
  memoriaInfo: any = {}; // Adicione esta linha
  nodeInfo: any = {}; // Adicione esta linha
  intervalId: any; // Adicione esta linha

  ngOnInit() {
    this.obterInfoHardware(); // Adicione esta linha
    this.startMemoryMonitoring(); // Adicione esta linha
    this.obterInfoNode(); // Adicione esta linha
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onClick() {
    this.msg = 'Welcome ' + this.text;
  }

  executarComando() {
    console.log('rodou = executarComando');
    this.comando = this.text;
    if (!this.comando.trim()) {
      console.log('Erro: Digite um comando antes de executar.');
      this.output = "Erro: Digite um comando antes de executar.";
      return;
    }
  
    if (window.electronAPI) {
      window.electronAPI.executarComando(this.comando)
        .then((output: string) => {
          console.log('Comando executado sem saída.');
          this.msg = output;
          this.output = output || "Comando executado sem saída.";
        })
        .catch((error: string) => {
          console.log(`Erro: ${error}`);
          this.output = `Erro: ${error}`;
        });
    } else {
      console.log('Electron API não disponível..');
      this.output = "Electron API não disponível.";
    }
  }

  obterInfoHardware() {
    if (window.electronAPI) {
      window.electronAPI.obterInfoHardware()
        .then((info: any) => {
          this.hardwareInfo = info;
        })
        .catch((error: string) => {
          console.error(`Erro ao obter informações sobre o hardware: ${error}`);
        });
    } else {
      console.error('Electron API não disponível.');
    }
  }

  startMemoryMonitoring() {
    this.intervalId = setInterval(() => {
      if (window.electronAPI) {
        window.electronAPI.obterMemoria()
          .then((mem: any) => {
            this.memoriaInfo = mem;
          })
          .catch((error: string) => {
            console.error(`Erro ao obter informações de memória: ${error}`);
          });
      } else {
        console.error('Electron API não disponível.');
      }
    }, 1000); // Atualiza a cada 1 segundo
  }

  obterInfoNode() {
    if (window.electronAPI) {
      window.electronAPI.obterInfoNode()
        .then((info: any) => {
          this.nodeInfo = info;
        })
        .catch((error: string) => {
          console.error(`Erro ao obter informações sobre o Node.js: ${error}`);
        });
    } else {
      console.error('Electron API não disponível.');
    }
  }
}