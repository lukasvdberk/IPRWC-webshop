import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerRegisterComponent} from "./customer-register/customer-register.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CustomerService} from "./customer.service";
import {AuthenticationModule} from "../authentication/authentication.module";
import { CustomerSigningComponent } from './customer-signing/customer-signing.component';
import { CustomerComponent } from './customer/customer.component';
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {
    path: 'signing', component: CustomerSigningComponent
  },
]

@NgModule({
  declarations: [
    CustomerRegisterComponent,
    CustomerSigningComponent,
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AuthenticationModule,
    SharedModule,

  ],
  exports: [
    CustomerComponent
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
