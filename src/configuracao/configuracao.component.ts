import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-configuracao',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule,
    FormsModule, PasswordModule, DropdownModule, CardModule
  ],
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoComponent implements OnInit {
  configuracaoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.configuracaoForm = this.fb.group({
      senhaSudo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.carregarConfiguracao();
  }

  carregarConfiguracao() {
    if (window.electronAPI) {
      window.electronAPI.obterConfiguracoes()
        .then((configuracoes: any[]) => {
          if (configuracoes.length > 0) {
            console.log('cfg = ' + JSON.stringify(configuracoes[0]));
            this.configuracaoForm.patchValue({senhaSudo: configuracoes[0].SENHA_SUDO});
          }
        })
        .catch((error: string) => {
          console.error(`Erro ao obter configurações: ${error}`);
        });
    }
  }

  salvarConfiguracao() {
    const configuracao = this.configuracaoForm.value;
    if (window.electronAPI) {
      window.electronAPI.salvarConfiguracao(configuracao)
        .then(() => {
          console.log('Configuração salva com sucesso.');
        })
        .catch((error: string) => {
          console.error(`Erro ao salvar configuração: ${error}`);
        });
    }
  }
}