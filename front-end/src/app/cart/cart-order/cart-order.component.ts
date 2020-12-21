import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartItem} from "../shopping-cart-item";

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.css']
})
export class CartOrderComponent implements OnInit {
  @Input() cartItems: ShoppingCartItem[] | undefined
  constructor() { }

  ngOnInit(): void {

  }

  calculateTotal(): number {
    if(this.cartItems !== undefined) {
      let totalAmount = 0;
      for (let i = 0; i < this.cartItems.length; i++) {
        const cartItem = this.cartItems[i];
        totalAmount += cartItem.amount * cartItem.product.price
      }

      return totalAmount
    }
    return 0
  }
}
