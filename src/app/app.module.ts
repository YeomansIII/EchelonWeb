import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule} from "angularfire2";
import {MaterialModule} from "@angular/material";
import { LoginComponent } from './login/login.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCRfvrUhnL__JjTZcuyrv5SpdnxmfPRhaM",
  authDomain: "flickering-heat-6442.firebaseapp.com",
  databaseURL: "https://flickering-heat-6442.firebaseio.com",
  storageBucket: "flickering-heat-6442.appspot.com",
  messagingSenderId: "715574811680"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
