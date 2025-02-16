import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(PanelMenuModule,CommonModule,),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};