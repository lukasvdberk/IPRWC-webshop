import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProductModule} from "./product/product.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./api/http-client.interceptor";
import {environment} from "../environments/environment";
import {SharedModule} from "./shared/shared.module";
import {ToastService} from "./shared/toast-service/toast.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductModule,
  ],
  providers: [
    ToastService,
    HttpClient,
    HttpClient,
    {provide: 'BASE_API_URL', useValue: environment.baseUrl},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
