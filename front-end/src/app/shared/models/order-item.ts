import {Product} from "../../product/product";

// There is only 1 type of product
export interface OrderItem {
  product: Product
  amount: number
}
