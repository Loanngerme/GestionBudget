/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideNativeDateAdapter } from '@angular/material/core'; 
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers, 
    provideNativeDateAdapter(), 
    provideAnimationsAsync(),
  ],
})
.catch((err) => console.error(err));