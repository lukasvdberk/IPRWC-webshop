import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class ProductService {
  constructor(private httClient:HttpClient) {}

  getProducts() {
    return this.httClient.get(
      "http://127.0.0.1/api/products",
    )
  }
}
