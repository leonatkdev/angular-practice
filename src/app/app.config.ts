import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withComponentInputBinding() binds route params (e.g. :id) to
    // matching component signal inputs automatically.
    provideRouter(routes, withComponentInputBinding()),
    // Enables HttpClient injection everywhere. withFetch() makes Angular
    // use the browser fetch() API under the hood (recommended default).
    provideHttpClient(withFetch())
  ]
};
