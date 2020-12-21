import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Order} from "./order";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.post(`orders/user/` + order.customer.id,
      orderToSendToApi
    )
  }
}
