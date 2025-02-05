import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component'; // Importe o LayoutComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Use o LayoutComponent aqui
  styleUrls: ['./app.component.scss'],
  standalone: true, // Standalone Component
  imports: [LayoutComponent], // Inclua o LayoutComponent aqui
})
export class AppComponent {}
