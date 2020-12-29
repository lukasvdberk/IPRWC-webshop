import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";
import {ToastService} from "../../shared/toast-service/toast.service";

@Component({
  selector: 'app-product-customer',
  templateUrl: './product-customer.component.html',
  styleUrls: ['./product-customer.component.css']
})
export class ProductCustomerComponent implements OnInit {
  products: Product[] = []
  constructor(private productService: ProductService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.setProduct()
  }

  setProduct() {
    this.productService.getProducts().subscribe((response)=> {
      this.products = response as Product[]
    }, error => {
      this.toastService.showError({
        message: 'Failed to fetch products. Try again later.',
        durationInSeconds: 5
      })
    });
  }

}
