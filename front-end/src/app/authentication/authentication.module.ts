import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationService} from "./authentication.service";
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService
  ],
  exports: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
