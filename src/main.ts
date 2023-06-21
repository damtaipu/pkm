/// <reference types="@angular/localize" />

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/app-routing.module';
import { dependencyInjection } from './app/shared/dependency-injection';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom(BrowserModule, HttpClientModule),
    dependencyInjection
  ]
}).catch((err) =>
  console.log(err)
);
