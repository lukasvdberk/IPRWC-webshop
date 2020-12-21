import {Component, Input, OnInit} from '@angular/core';
import {OrderItem} from "../../shared/models/order-item";
import {OrderCartUtil} from "../../shared/order-cart-util";

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.css']
})
export class CartOrderComponent implements OnInit {
  @Input() cartItems: OrderItem[] | undefined
  constructor() { }

  ngOnInit(): void {

  }

  calculateTotal(): number {
    if(this.cartItems != undefined) {
      return OrderCartUtil.calculateTotal(this.cartItems)
    }
    return 0
  }
}
