import { Component, OnInit } from '@angular/core';
import {Customer} from "../../customer/customer";
import {CustomerService} from "../../customer/customer.service";
import {CartService} from "../../cart/cart.service";
import {OrderItem} from "../models/order-item";
import {AuthenticationService} from "../../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  customer: Customer | undefined
  cartItems: OrderItem[] | undefined
  isUserAdmin: boolean | undefined

  constructor(private customerService: CustomerService, private cartService: CartService, private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.customerService.getCustomer().subscribe(customer => {
      this.customer = customer
    })
    this.cartItems = this.cartService.getShoppingCartItems()
    this.isUserAdmin = this.authService.isAdmin()
    this.cartService.cartSubject.subscribe((newShoppingCartItems) => {
      this.cartItems = newShoppingCartItems
    })
  }

  logout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    })
  }
}
