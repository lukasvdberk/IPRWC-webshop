import { Component, OnInit } from '@angular/core';
import {Customer} from "../../customer/customer";
import {CustomerService} from "../../customer/customer.service";
import {CartService} from "../../cart/cart.service";
import {OrderItem} from "../models/order-item";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  customer: Customer | undefined
  cartItems: OrderItem[] | undefined
  isUserAdmin: boolean | undefined

  constructor(private customerService: CustomerService, private cartService: CartService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.customerService.getCustomer().then(customer => {
      this.customer = customer
    })
    this.cartItems = this.cartService.getShoppingCartItems()
    this.isUserAdmin = this.authService.isAdmin()
    this.cartService.cartSubject.subscribe((newShoppingCartItems) => {
      this.cartItems = newShoppingCartItems
    })
  }

}
