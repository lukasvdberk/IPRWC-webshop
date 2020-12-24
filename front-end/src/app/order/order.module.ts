import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { PlaceOrderComponent } from './place-order/place-order.component';
import {UserGuard} from "../shared/guards/user-guard.service";
import {OrderService} from "./order.service";
import { OrdersComponent } from './orders-from-customer/orders.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {CustomerModule} from "../customer/customer.module";
import {ProductModule} from "../product/product.module";
import {CartModule} from "../cart/cart.module";
import { AllOrdersAdminComponent } from './all-orders-admin/all-orders-admin.component';
import {AdminGuard} from "../shared/guards/admin.guard";

const routes: Routes = [
  {
    path: 'place-order', component: PlaceOrderComponent, canActivate: [UserGuard]
  },
  {
    path: 'all', component: AllOrdersAdminComponent, canActivate: [AdminGuard]
  },
  {
    path: 'detail/:orderId', component: OrderDetailComponent, canActivate: [UserGuard]
  },
  {
    path: 'orders', component: OrdersComponent, canActivate: [UserGuard]
  }
]

@NgModule({
  declarations: [
    PlaceOrderComponent,
    OrdersComponent,
    OrderItemComponent,
    OrderDetailComponent,
    AllOrdersAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomerModule,
    ProductModule,
    CartModule
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }
