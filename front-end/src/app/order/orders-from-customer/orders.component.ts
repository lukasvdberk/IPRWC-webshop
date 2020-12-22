import { Component, OnInit } from '@angular/core';
import {Order} from "../order";
import {OrderService} from "../order.service";
import {CustomerService} from "../../customer/customer.service";
import {ToastService} from "../../shared/toast-service/toast.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] | undefined
  constructor(private orderService: OrderService, private customerService: CustomerService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.customerService.getCustomer().then((customer) => {
      if(customer !== undefined) {
        this.orderService.getOrdersOfCustomer(customer).subscribe((orders) => {
          // @ts-ignore
          this.orders = orders.reverse()
        }, (error) => {
          this.toastService.showError({
            message: 'Failed to fetch your orders-from-customer. Try logging in again.',
            durationInSeconds: 5
          })
        })
      }
    })
  }

}
