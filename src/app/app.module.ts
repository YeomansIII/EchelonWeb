import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import {MaterialModule, OVERLAY_PROVIDERS, MdIconRegistry} from "@angular/material";
import {LoginComponent} from './login/login.component';
import {routing, appRoutingProviders} from "./app.routes";
import {AuthGuard} from "./other/auth.gaurd";
import {ToolbarService} from "./services/toolbar.service";
import {AuthService} from "./services/auth.service";
import SpotifyService from "./services/spotify.service";

export const firebaseConfig = {
  apiKey: "AIzaSyCRfvrUhnL__JjTZcuyrv5SpdnxmfPRhaM",
  authDomain: "flickering-heat-6442.firebaseapp.com",
  databaseURL: "https://flickering-heat-6442.firebaseio.com",
  storageBucket: "flickering-heat-6442.appspot.com",
  messagingSenderId: "715574811680"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.CustomToken
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    SpotifyService,
    ToolbarService,
    appRoutingProviders,
    OVERLAY_PROVIDERS,
    MdIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
