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

  onDelete(productToRemove: Product) {
    this.productService.deleteProduct(productToRemove).subscribe(
      (response) => {
        if(this.products) {
          const productToDelete = this.products.findIndex((product) => product.id == productToRemove.id)
          this.products.splice(productToDelete, 1)
          this.toastService.showSuccess({
            message: `Product ${productToRemove.name} got deleted`,
            durationInSeconds: 4
          })
        }
      },
      (error) => {
        this.toastService.showError({
          message: `Failed to delete ${productToRemove.name}`,
          durationInSeconds: 4
        })
      })
  }
}
