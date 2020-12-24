import { Component, OnInit } from '@angular/core';
import {Order} from "../order";
import {OrderService} from "../order.service";
import {ToastService} from "../../shared/toast-service/toast.service";

@Component({
  selector: 'app-all-orders-admin',
  templateUrl: './all-orders-admin.component.html',
  styleUrls: ['./all-orders-admin.component.css']
})
export class AllOrdersAdminComponent implements OnInit {
  orders: Order[] | undefined

  constructor(private orderService: OrderService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((allOrders) => {
      this.orders = allOrders
    }, error => {
      this.toastService.showError({
        message: 'Failed to fetch all the orders. Try again later.',
        durationInSeconds: 4
      })
    })
  }

}
