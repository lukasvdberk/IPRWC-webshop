import { Component, OnInit } from '@angular/core';
import {OrderItem} from "../../shared/models/order-item";
import {CartService} from "../cart.service";
import {Product} from "../../product/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: OrderItem[] | undefined
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getShoppingCartItems()
  }

  onCartItemUpdated(item: OrderItem) {
    if(this.cartItems) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i] === item) {
          this.cartItems[i] = item;
        }
      }
      this.cartService.setCartItems(this.cartItems)
    }
  }

  onCartItemRemoved(item: OrderItem) {
    if(this.cartItems) {
      for(let i = 0; i < this.cartItems.length; i++){
        if (this.cartItems[i] === item) {
          this.cartItems.splice(i, 1);
        }
      }
      this.cartService.setCartItems(this.cartItems)
    }
  }

  onClearCart() {
    if (this.cartItems) {
      this.cartService.setCartItems([])
      this.cartItems = []
    }
  }
}
