import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerRegisterComponent} from "./customer-register/customer-register.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CustomerService} from "./customer.service";

const routes: Routes = [
  {
    path: 'register', component: CustomerRegisterComponent
  },
]

@NgModule({
  declarations: [
    CustomerRegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
