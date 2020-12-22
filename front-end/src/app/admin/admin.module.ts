import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSigningComponent } from './admin-signing/admin-signing.component';
import {AuthenticationModule} from "../authentication/authentication.module";
import {RouterModule, Routes} from "@angular/router";
import { AdminManageProductsComponent } from './admin-manage-products/admin-manage-products.component';

const routes: Routes = [
  {
    path: 'signing', component: AdminSigningComponent,
  }
]

@NgModule({
  declarations: [AdminSigningComponent, AdminManageProductsComponent],
  imports: [
    CommonModule,
    AuthenticationModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
