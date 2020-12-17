import {Product} from "../product/product";

// There is only 1 type of product
export interface ShoppingCartItem {
  product: Product
  amount: number
}
