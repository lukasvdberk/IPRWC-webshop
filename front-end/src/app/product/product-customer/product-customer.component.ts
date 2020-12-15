import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";

@Component({
  selector: 'app-product-customer',
  templateUrl: './product-customer.component.html',
  styleUrls: ['./product-customer.component.css']
})
export class ProductCustomerComponent implements OnInit {
  products: Product[] = []
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.setProduct()
  }

  setProduct() {
    this.productService.getProducts().subscribe((response)=> {
      this.products = response as Product[]
      console.log(this.products)
    }, error => {
      // TODO display appropriate error
    });
  }

}
