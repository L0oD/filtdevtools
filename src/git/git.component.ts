import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, TreeModule, ButtonModule, MessageModule, FormsModule],
  templateUrl: './git.component.html',
  styleUrl: './git.component.scss'
})
export class GitComponent implements OnInit{
  directories: TreeNode[] = [];

  text = '';

  msg = '';

  onClick() {
    this.msg = 'Welcome ' + this.text;
  }

  comando: string = '';
  output: string = '';

  ngOnInit() {
    if (window.electronAPI) {
      window.electronAPI.listarDiretorios()
        .then((dirs: TreeNode[]) => {
          this.directories = dirs;
        })
        .catch((error: string) => {
          console.error(`Erro ao listar diretórios: ${error}`);
        });
    } else {
      console.error('Electron API não disponível.');
    }
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
}
