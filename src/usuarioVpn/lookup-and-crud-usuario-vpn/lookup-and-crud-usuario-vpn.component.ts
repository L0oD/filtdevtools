import { Component, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { UsuarioVpn } from '../../../electron/database/models/usuarioVpn.model';
import { LookupbasicComponent } from '../../baseComponents/lookupbasic/lookupbasic.component';
import {UsuarioVpnFormComponent} from '../../usuarioVpn/usuario-vpn.form/usuario-vpn.form.component';

@Component({
  selector: 'app-lookup-and-crud-usuario-vpn',
  imports: [FormsModule, InputTextModule, PasswordModule, DropdownModule, ButtonModule, AutoCompleteModule, DialogModule, LookupbasicComponent, UsuarioVpnFormComponent],
  templateUrl: './lookup-and-crud-usuario-vpn.component.html',
  styleUrl: './lookup-and-crud-usuario-vpn.component.scss'
})
export class LookupAndCrudUsuarioVpnComponent implements OnInit{
  usuariosVpn: UsuarioVpn[] = [];
  listUsuariosVpn: UsuarioVpn[] = [];
  usuarioVpn: UsuarioVpn = new UsuarioVpn();
  display: boolean = false;

  @Output() onDoubleClickSelected: EventEmitter<UsuarioVpn> = new EventEmitter<UsuarioVpn>();

  @ViewChild('lookup') lookup!: LookupbasicComponent;
  @ViewChild('usuarioVpnForm') usuarioVpnForm!: UsuarioVpnFormComponent;

  
  data: any[] = [];
  columns: any[] = [];

  openDialog() {
    this.display = true;
  }  

  ngOnInit() {
    this.buscarUsuariosVpn(null);
  }

  buscarUsuariosVpn(event: any) {
    if (window.electronAPI) {
      window.electronAPI.obterUsuariosVpn()
        .then((usuariosVpn: UsuarioVpn[]) => {
          if (usuariosVpn.length > 0) {
            this.data = usuariosVpn;
            this.listUsuariosVpn = usuariosVpn;
          }
        })
        .catch((error: string) => {
        });
    }
  }

  onRowSelectHandler(data: any) {
    console.log('data = ', data);
    const newUsuarioVpn = new UsuarioVpn(data.USUARIO, data.SENHA, data.USUARIO_VPN_ID);
    console.log('data = ', newUsuarioVpn);
    this.usuarioVpnForm.currentUsuarioVpn = newUsuarioVpn;
    this.usuarioVpnForm.updateForm();
  }

  onRowDoubleClickHandler(data: any) {
    const selectedUsuarioVpn = new UsuarioVpn(data.USUARIO, data.SENHA, data.USUARIO_VPN_ID);
    this.onDoubleClickSelected.emit(selectedUsuarioVpn);
    this.display = false;
  }

  onUsuarioVpnSalvo() {
    this.buscarUsuariosVpn(null);
  }
  
  onUsuarioVpnDeletado() {
    this.buscarUsuariosVpn(null);
  }
}
