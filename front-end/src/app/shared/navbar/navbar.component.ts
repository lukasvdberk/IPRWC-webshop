import { Component, OnInit } from '@angular/core';
import {Customer} from "../../customer/customer";
import {CustomerService} from "../../customer/customer.service";
import {CartService} from "../../cart/cart.service";
import {ShoppingCartItem} from "../../cart/shopping-cart-item";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  customer: Customer | undefined
  cartItems: ShoppingCartItem[] | undefined
  constructor(private customerService: CustomerService, private cartService: CartService) { }

  ngOnInit(): void {
    this.customer = this.customerService.getCustomer()
    this.cartItems = this.cartService.getShoppingCartItems()
  }

}
