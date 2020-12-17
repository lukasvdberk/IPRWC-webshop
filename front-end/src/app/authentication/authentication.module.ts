import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationService} from "./authentication.service";



@NgModule({
  declarations: [],
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
