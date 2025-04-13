import {
  ApplicationConfig,
  InjectionToken,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideTransloco } from '@jsverse/transloco';
import { provideHttpClient } from '@angular/common/http';
import { TransLocoHttpLoader } from './transloco-loader';

export const APP_VERSION = new InjectionToken<string>('APP_VERSION');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: APP_VERSION, useValue: environment.version },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTransloco({
      config: {
        availableLangs: ['fr', 'en'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TransLocoHttpLoader,
    }),
  ]
};
