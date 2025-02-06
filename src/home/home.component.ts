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