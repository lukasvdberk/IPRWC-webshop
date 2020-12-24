import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {mediaUrl} from "./image-url.pipe";
import {ToastService} from "./toast-service/toast.service";
import {ToastComponent} from "./toast-service/toast/toast.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from "@angular/router";
import { CountryPickerComponent } from './country-picker/country-picker.component';

@NgModule({
  declarations: [
    mediaUrl,
    ToastComponent,
    NavbarComponent,
    CountryPickerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
  ],
  exports: [
    mediaUrl,
    ToastComponent,
    NavbarComponent,
  ],
})
export class SharedModule { }
