import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {NgForm} from "@angular/forms";
import {ShoppingCartItem} from "../../cart/shopping-cart-item";
import {CartService} from "../../cart/cart.service";
import {ToastService} from "../../shared/toast-service/toast.service";

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
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
              private cartService: CartService, private toastService: ToastService) { }

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
    const isAddedToCart = this.cartService.addProductToShoppingCart({
      size: this.orderForm.value.size,
      amount: this.orderForm.value.amount,
      product: this.product,
    });
    if (isAddedToCart) {
      this.toastService.showSuccess({
        durationInSeconds: 4,
        message: `${this.orderForm.value.amount} ${this.product.name} added to cart`
      })
    } else {
      this.toastService.showSuccess({
        durationInSeconds: 4,
        message: 'Could not add product, please try again later'
      })
    }
  }

}
