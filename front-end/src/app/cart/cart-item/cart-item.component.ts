import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ShoppingCartItem} from "../shopping-cart-item";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  amount = 1
  @Input() cartItem: ShoppingCartItem | undefined
  @Output() updated: EventEmitter<ShoppingCartItem> = new EventEmitter();
  @Output() removed: EventEmitter<ShoppingCartItem> = new EventEmitter();


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
}
