import { Component, OnInit } from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../product.service";
import {ToastService} from "../../shared/toast-service/toast.service";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: Product[] | undefined
  constructor(private productService: ProductService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products as Product[]
    }, (error)  =>  {
      this.toastService.showError({
        message: 'Failed to fetch products try again later.',
        durationInSeconds: 4
      })
    })
  }

}
