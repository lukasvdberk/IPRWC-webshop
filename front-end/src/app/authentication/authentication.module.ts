import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationService} from "./authentication.service";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthenticationService
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
