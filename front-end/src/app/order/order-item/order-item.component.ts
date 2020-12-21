import {Component, Input, OnInit} from '@angular/core';
import {OrderItem} from "../../shared/models/order-item";
import {OrderCartUtil} from "../../shared/order-cart-util";
import {Order} from "../order";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order | undefined
  constructor() { }

  ngOnInit(): void {
  }

  calculateTotal(): number {
    if(this.order != undefined) {
      return OrderCartUtil.calculateTotal(this.order.productOrders)
    }
    return 0
  }
}
