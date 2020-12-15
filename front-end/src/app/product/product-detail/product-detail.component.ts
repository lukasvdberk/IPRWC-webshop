import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('orderForm') orderForm: NgForm | any;

  sizes = [
    {
      name: "Large",
      value: "L"
    },
    {
      name: "Medium",
      value: "M"
    },
    {
      name: "Small",
      value: "S"
    },
  ]
  product: Product | any = undefined;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      // TODO fetch product by id
      const productId = params['id']
      this.productService.getProductById(productId as number).subscribe((product) => {
        if(product === undefined) {
          // TODO not found so throw a 404
        } else {
          this.product = product;
        }
      })
    })
  }

  onSubmit() {
    // TODO add to shopping cart or go to finalize order page.
    console.log(this.orderForm.value)
  }

}
