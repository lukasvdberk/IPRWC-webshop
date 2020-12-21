import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { PlaceOrderComponent } from './place-order/place-order.component';
import {RequiresUserGuard} from "../shared/guards/requires-user.guard";

const routes: Routes = [
  {
    path: 'place-order', component: PlaceOrderComponent, canActivate: [RequiresUserGuard]
  }
]

@NgModule({
  declarations: [PlaceOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderModule { }
