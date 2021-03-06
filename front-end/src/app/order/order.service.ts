import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Order} from "./order";
import {AuthenticationService} from "../authentication/authentication.service";
import {Customer} from "../customer/customer";

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  // Requires valid JWT Key
  placeOrder(order: Order): Observable<any>{
    let orderToSendToApi: Object[] = []

    // @ts-ignore
    for (let i = 0; i < order.productOrders.length; i++) {
      // @ts-ignore
      const productOrder = order.productOrders[i] as any
      orderToSendToApi.push({
        productId: productOrder.product.id,
        amount: productOrder.amount,
        size: productOrder?.size === undefined ? undefined : productOrder?.size
      })
    }
    return this.httpClient.post(`orders/users/` + order.customer.id,
      orderToSendToApi
    )
  }

  // Requires the customer.user.id to be the same as in the JWT key
  getOrdersOfCustomer(customer: Customer): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`orders/users/` + customer.user.id)
  }

  // You can only fetch this if the user is an admin
  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>('orders/all')
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`orders/${orderId}`)
  }

  updateOrderStatus(orderId: number, newStatus: string) {
    return this.httpClient.patch(
      `orders/${orderId}/status`,
      {
        status: newStatus
      }
    )
  }

  deleteOrder(orderId: number) {
    return this.httpClient.delete(
      `orders/${orderId}`
    )
  }
}
