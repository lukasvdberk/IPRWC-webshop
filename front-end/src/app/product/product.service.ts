import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, filter, map} from "rxjs/operators";
import {Product} from "./product";
import {Subscribable, throwError} from "rxjs";

@Injectable()
export class ProductService {
  constructor(private httpClient:HttpClient) {}

  getProducts() {
    return this.httpClient.get(
      "products",
    )
  }

  getProductById(productId: number) {
    return this.httpClient.get<Product[]>(
      "products",
    ).pipe(
      map((products) => {
        const product = products.find(product => {
          return product.id == productId;
        })

        catchError((error: HttpErrorResponse) => { return throwError(error); })
        return product
      })
    )
  }
}
