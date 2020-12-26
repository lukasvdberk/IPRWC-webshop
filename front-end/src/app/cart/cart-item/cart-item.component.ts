import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrderItem} from "../../shared/models/order-item";
import {TShirtOrderItem} from "../../shared/models/t-shirt-order-item";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  amount = 1
  @Input() editable = true
  @Input() cartItem: OrderItem | TShirtOrderItem | undefined
  @Output() updated: EventEmitter<OrderItem> = new EventEmitter();
  @Output() removed: EventEmitter<OrderItem> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    if(this.cartItem) {
      this.amount = this.cartItem.amount
    }
  }

  onRemove() {
    this.removed.emit(this.cartItem);
  }

  updateAmount(event: any) {
    if(this.cartItem) {
      this.cartItem.amount = this.amount
      this.updated.emit(this.cartItem)
    }
  }

  isTShirtCartItem(cartItem: any) {
    return (<TShirtOrderItem>cartItem) !== undefined;
  }
}
