import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerRegisterComponent} from "./customer-register/customer-register.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'register', component: CustomerRegisterComponent
  },
]

@NgModule({
  declarations: [
    CustomerRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
