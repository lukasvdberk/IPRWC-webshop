import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {Product} from "./product";
import {Observable, Subscribable, throwError} from "rxjs";

@Injectable()
export class ProductService {
  constructor(private httpClient:HttpClient) {}

  getProducts() {
    return this.httpClient.get(
      "products",
    )
  }

  getProductById(productId: number) {
    return this.httpClient.get<Product>(
      `product/${productId}`,
    )
  }

  // NOTE requires admin authentication
  addProduct(product :Product, imageFile: File): Observable<any> {
    return this.httpClient.post(
      'products',
      product
    ).pipe(tap((response: any) => {
      const imageForm = new FormData();
      imageForm.append("image", imageFile, imageFile.name);
      // TODO refactor to cleaner way
      this.httpClient.put(`products/${response.productId}/image`, imageForm)
        .subscribe((response2) => {}, (error) => {})
    }))
  }

  editProduct(existingProduct :Product, imageFile: File | undefined) {
    return this.httpClient.patch(
      `products/${existingProduct.id}`,
      existingProduct
    ).pipe(tap((response: any) => {
      if (imageFile) {
        const imageForm = new FormData();
        imageForm.append("image", imageFile, imageFile.name);
        // TODO refactor to cleaner way
        this.httpClient.put(`products/${existingProduct.id}/image`, imageForm)
          .subscribe((response2) => {}, (error) => {})
      }
    }))
  }

  deleteProduct(product: Product): Observable<any> {
    return this.httpClient.delete(`products/${product.id}`)
  }
}
