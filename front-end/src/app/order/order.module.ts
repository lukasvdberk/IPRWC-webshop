import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { PlaceOrderComponent } from './place-order/place-order.component';
import {RequiresUserGuard} from "../shared/guards/requires-user.guard";
import {OrderService} from "./order.service";
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'place-order', component: PlaceOrderComponent, canActivate: [RequiresUserGuard]
  }
]

@NgModule({
  declarations: [PlaceOrderComponent, OrdersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }
