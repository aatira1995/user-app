import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxFontAwesomeModule } from 'ngx-font-awesome';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgxFontAwesomeModule
  ],
  providers: [NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
