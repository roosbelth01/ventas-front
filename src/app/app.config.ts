import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ErrorResponseInterceptors } from './core/interceptors/error-response-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), BrowserModule, BrowserModule, provideAnimations(), provideHttpClient(
    withFetch(),
    withInterceptors([ErrorResponseInterceptors])
  ),
    
  ]
};
