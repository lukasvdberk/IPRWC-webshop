import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSigningComponent } from './admin-signing/admin-signing.component';
import {AuthenticationModule} from "../authentication/authentication.module";
import {RouterModule, Routes} from "@angular/router";
import {AdminGuard} from "../shared/guards/admin.guard";

const routes: Routes = [
  {
    path: 'signing', component: AdminSigningComponent,
  },
]

@NgModule({
  declarations: [AdminSigningComponent],
  imports: [
    CommonModule,
    AuthenticationModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
