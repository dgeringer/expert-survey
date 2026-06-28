import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

/**
 * Globale App-Konfiguration.
 * Bewusst minimal gehalten: kein Router, kein HttpClient, kein Backend.
 * Die App laeuft vollstaendig lokal im Browser.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()]
};
