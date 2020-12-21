import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes} from "@angular/router";
import {ProductModule} from "../product/product.module";
import { CartItemComponent } from './cart-item/cart-item.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import { CartOrderComponent } from './cart-order/cart-order.component';

const routes: Routes = [
  {
    path: 'items', component: CartComponent
  }
]

@NgModule({
  declarations: [CartComponent, CartItemComponent, CartOrderComponent],
  imports: [
    CommonModule,
    ProductModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ]
})
export class CartModule { }
