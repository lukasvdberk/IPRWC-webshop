import {OrderItem} from "../shared/models/order-item";
import {Customer} from "../customer/customer";
import {TShirtOrderItem} from "../shared/models/t-shirt-order-item";

export interface Order {
  id?: number;
  orderedOn?: Date
  customer: Customer;
  productOrders: OrderItem[];
}
