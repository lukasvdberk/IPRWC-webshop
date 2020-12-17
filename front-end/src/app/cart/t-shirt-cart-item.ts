import {ShoppingCartItem} from "./shopping-cart-item";

export interface TShirtCartItem extends ShoppingCartItem{
  // Only shirts have sizes.
  size: string
}
