import {OrderItem} from "./models/order-item";

export class OrderCartUtil {
  static calculateTotal(items: OrderItem[]) {
    let totalAmount = 0;
    for (let i = 0; i < items.length; i++) {
      const cartItem = items[i];
      totalAmount += cartItem.amount * cartItem.product.price
    }

    return totalAmount
  }
}
