import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import {LookupAndCrudUsuarioVpnComponent} from '../../usuarioVpn/lookup-and-crud-usuario-vpn/lookup-and-crud-usuario-vpn.component';
import { UsuarioVpn } from '../../../electron/database/models/usuarioVpn.model';

@Component({
  selector: 'app-input-and-lookup-crud-usuario-vpn',
  imports: [FormsModule, InputTextModule, PasswordModule, DropdownModule, 
    ButtonModule, AutoCompleteModule, DialogModule, LookupAndCrudUsuarioVpnComponent],
  templateUrl: './input-and-lookup-crud-usuario-vpn.component.html',
  styleUrl: './input-and-lookup-crud-usuario-vpn.component.scss'
})
export class InputAndLookupCrudComponent implements OnInit{
  usuarioVpn: UsuarioVpn = new UsuarioVpn();

  @ViewChild('lookupAndCrudUsuarioVpn') lookupAndCrudUsuarioVpn!: LookupAndCrudUsuarioVpnComponent;

 ngOnInit(): void {
   
 }

 setInputUsuarioVpn(usuarioVpn: UsuarioVpn) {
  this.usuarioVpn = usuarioVpn;
}

 openDialogUsuarioVpn() {
  this.lookupAndCrudUsuarioVpn.display = true;
}
 
}
