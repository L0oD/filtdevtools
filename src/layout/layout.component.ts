import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, MenubarModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: ['/home'],
    },
    {
      label: 'Git',
      icon: 'pi pi-github',
      routerLink: ['/git'],
    },
    {
      label: 'VPN',
      icon: 'pi pi-wifi',
      routerLink: ['/vpn'],
    }
  ];
}
