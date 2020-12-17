import { Injectable } from '@angular/core';
import {ShoppingCartItem} from "./shopping-cart-item";
import {TShirtCartItem} from "./t-shirt-cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getShoppingCartItems(): ShoppingCartItem[] {
    try {
      const cartItems = localStorage.getItem('shoppingCartItems')
      const items = JSON.parse(<string>cartItems) as ShoppingCartItem[];
      if (items === null) {
        return []
      }
      return items
    }
     catch (e) {
      // if there are no current product
      return []
    }
  }

  addProductToShoppingCart(item: ShoppingCartItem | TShirtCartItem): boolean {
    try {
      // add to existing products
      let currentShoppingItems = this.getShoppingCartItems();
      currentShoppingItems.push(item)
      localStorage.setItem('shoppingCartItems', JSON.stringify(currentShoppingItems));
      return true
    } catch (e) {
      return false
    }
  }

  clearShoppingCart() {
    localStorage.removeItem('shoppingCartItems')
  }
}

