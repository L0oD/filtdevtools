import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UsuarioVpn } from '../../../electron/database/models/usuarioVpn.model';

@Component({
  selector: 'app-usuario-vpn-form',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule,
    FormsModule, PasswordModule, DropdownModule, CardModule, ToastModule
  ],
  templateUrl: './usuario-vpn.form.component.html',
  styleUrls: ['./usuario-vpn.form.component.scss'],
  providers: [MessageService]
})
export class UsuarioVpnFormComponent implements OnInit, OnChanges {
  usuarioVpnForm: FormGroup;
  @Input() currentUsuarioVpn: UsuarioVpn = new UsuarioVpn();
  @Output() usuarioVpnSalvo: EventEmitter<UsuarioVpn> = new EventEmitter<UsuarioVpn>();
  @Output() usuarioVpnDeletado: EventEmitter<UsuarioVpn> = new EventEmitter<UsuarioVpn>();

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.usuarioVpnForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes:', changes);
    if (changes['currentUsuarioVpn'] && !changes['currentUsuarioVpn'].firstChange) {
      this.updateForm();
    }
  }

  updateForm() {
    if (this.currentUsuarioVpn) {
      this.usuarioVpnForm.patchValue({
        usuario: this.currentUsuarioVpn.usuario,
        senha: this.currentUsuarioVpn.senha
      });
    }
  }

  disableDeleteButton() {
    return !this.currentUsuarioVpn.usuarioVpnId;
  }

  salvarUsuarioVpn() {
    if (this.usuarioVpnForm.valid) {
      const usuarioVpn = new UsuarioVpn(
        this.usuarioVpnForm.value.usuario,
        this.usuarioVpnForm.value.senha,
        this.currentUsuarioVpn.usuarioVpnId
      );

      if (window.electronAPI) {
        window.electronAPI.salvarUsuarioVpn(usuarioVpn)
          .then((savedUsuarioVpn) => {
            console.log('Usuário VPN salvo:', savedUsuarioVpn);
            this.usuarioVpnSalvo.emit(savedUsuarioVpn);
            this.messageService.add({ severity: 'success', summary: 'Salvo com sucesso'});
          })
          .catch((error) => {
            console.error('Erro ao salvar usuário VPN:', error);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });
          });
      }
    }
  }

  novoUsuarioVpn() {
    this.usuarioVpnForm.reset();
    this.currentUsuarioVpn = new UsuarioVpn();
  }

  deletaUsuarioVpn() {
    if (window.electronAPI) {
      window.electronAPI.removerUsuarioVpn(this.currentUsuarioVpn.usuarioVpnId)
        .then(() => {
          this.messageService.add({ severity: 'success', summary: 'Deletado com sucesso' });
          this.usuarioVpnDeletado.emit();
          this.novoUsuarioVpn();
        })
        .catch((error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });
        });
    }
  }
}