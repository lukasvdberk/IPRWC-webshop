import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../customer/customer.service";
import {OrderService} from "../order.service";
import {Order} from "../order";
import {OrderCartUtil} from "../../shared/order-cart-util";
import {ToastService} from "../../shared/toast-service/toast.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order | undefined
  constructor(private route: ActivatedRoute, private customerService: CustomerService, private orderService: OrderService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

       this.customerService.getCustomer().then((customer) => {
         if (customer) {
           this.orderService.getOrdersOfCustomer(customer).subscribe((orders) => {
            const existingOrderIndex = orders.findIndex((order) => order.id == params['orderId'])
            if (existingOrderIndex !== -1) {
              this.order = orders[existingOrderIndex];
              console.log(this.order.productOrders)
            } else {
              // TODO redirect to 404
            }
           }, error => {
             this.toastService.showError({
               message: 'Failed to fetch your orders please try again later',
               durationInSeconds: 3
             })
           })
         }
       })
    });
  }

  calculateTotal(): number {
    if(this.order != undefined) {
      return OrderCartUtil.calculateTotal(this.order.productOrders)
    }
    return 0
  }
}
