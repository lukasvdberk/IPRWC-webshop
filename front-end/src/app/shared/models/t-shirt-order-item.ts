import {OrderItem} from "./order-item";

export interface TShirtOrderItem extends OrderItem{
  // Only shirts have sizes.
  size: string
}
