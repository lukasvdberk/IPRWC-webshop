import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../customer/customer.service";
import {OrderService} from "../order.service";
import {Order} from "../order";
import {OrderCartUtil} from "../../shared/order-cart-util";
import {ToastService} from "../../shared/toast-service/toast.service";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId = -1
  order: Order | undefined
  isAdmin: boolean | undefined = false

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private orderService: OrderService,
              private toastService: ToastService, private  authService: AuthenticationService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin()

    this.route.params.subscribe(params => {
       this.orderId = +params['orderId']

       // If we are an admin we have access to all orders and want to filter through that
       if(this.isAdmin) {
         this.orderService.getAllOrders().subscribe(this.successOrderResponse.bind(this), this.errorSuccessOrderResponse.bind(this))
       } else {
         this.customerService.getCustomer().subscribe((customer) => {
           this.orderService.getOrdersOfCustomer(customer).subscribe(this.successOrderResponse.bind(this), this.errorSuccessOrderResponse.bind(this))
         }, error => {
           // TODO add error handler
         })
       }
    });
  }

  successOrderResponse(orders: Order[]): void {
    const existingOrderIndex = orders.findIndex((order) => {
      return order.id == this.orderId
    })
    if (existingOrderIndex !== -1) {
      this.order = orders[existingOrderIndex];
      console.log(this.order.productOrders)
    } else {
      // TODO redirect to 404
    }
  }

  errorSuccessOrderResponse(error: any): void {
    this.toastService.showError({
      message: 'Failed to fetch your orders-from-customer please try again later',
      durationInSeconds: 3
    })
  }

  calculateTotal(): number {
    if(this.order != undefined) {
      return OrderCartUtil.calculateTotal(this.order.productOrders)
    }
    return 0
  }
}
