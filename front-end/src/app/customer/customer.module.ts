import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerRegisterComponent} from "./customer-register/customer-register.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CustomerService} from "./customer.service";
import {AuthenticationModule} from "../authentication/authentication.module";
import { CustomerSigningComponent } from './customer-signing/customer-signing.component';

const routes: Routes = [
  {
    path: 'signing', component: CustomerSigningComponent
  },
]

@NgModule({
  declarations: [
    CustomerRegisterComponent,
    CustomerSigningComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AuthenticationModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
