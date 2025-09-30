import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import {routes} from './app.routes';
import { TranslationService } from './core/services/translation.service';

// Initialize translations before app starts
function initializeTranslations(translationService: TranslationService) {
  return () => translationService.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideLottieOptions({
      player: () => player,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      deps: [TranslationService],
      multi: true
    }
  ]
};
