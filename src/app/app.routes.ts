import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../home/home.component';
import { AppComponent } from './app.component';
import { GitComponent } from '../git/git.component';
import { VpnComponent } from '../vpn/vpn.component';
import { ConfiguracaoComponent } from '../configuracao/configuracao.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'git', component: GitComponent },
      { path: 'vpn', component: VpnComponent },
      { path: 'configuracao', component: ConfiguracaoComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
