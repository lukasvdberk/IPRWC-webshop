import {OrderItem} from "./order-item";

export interface TShirtOrderItem extends OrderItem{
  // Only t-shirts have sizes.
  size: string
}
