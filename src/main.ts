/// <reference types="@angular/localize" />

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/app-routing.module';
import { dependencyInjection } from './app/shared/dependency-injection';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { commentReducer } from './app/infra/store/reducer/comment/comment.reducer';
import { favoriteReducer } from './app/infra/store/reducer/favorite/favorite.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom(BrowserModule, HttpClientModule),
    dependencyInjection,
    provideStore({ textcomment: commentReducer, favoritePkm: favoriteReducer  })
]
}).catch((err) =>
  console.log(err)
);
