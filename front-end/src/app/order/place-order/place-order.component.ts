import { Component, OnInit } from '@angular/core';
import {OrderItem} from "../../shared/models/order-item";
import {CartService} from "../../cart/cart.service";
import {OrderService} from "../order.service";
import {CustomerService} from "../../customer/customer.service";
import {Router} from "@angular/router";
import {ToastService} from "../../shared/toast-service/toast.service";

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  shoppingCartItems: OrderItem[] | undefined
  constructor(private cartService: CartService, private orderService: OrderService, private customerService: CustomerService,
              private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.shoppingCartItems = this.cartService.getShoppingCartItems()
  }

  onPayed(): void {
    this.customerService.getCustomer().then((customer) => {
      const cartItems = this.cartService.getShoppingCartItems()
      this.orderService.placeOrder({
        // @ts-ignore
        customer: customer,
        productOrders: cartItems
      }).subscribe((response) => {
        this.toastService.showSuccess(
          {
            message: 'Placed order! You will be redirected to the order page in a couple of seconds.',
            durationInSeconds: 3
          }
        )
        this.cartService.clearShoppingCart()
        setTimeout(
          () => {
          this.router.navigate(['order', 'orders'])

        }, 3000)
      }, (error) => {
        this.toastService.showError({
          message: 'Failed to place order. Please try again later',
          durationInSeconds: 3
        })
      })
    })
  }
}
