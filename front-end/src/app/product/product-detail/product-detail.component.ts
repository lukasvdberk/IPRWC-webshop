import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {NgForm} from "@angular/forms";
import {OrderItem} from "../../shared/models/order-item";
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
              private cartService: CartService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
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

  addToShoppingCart() {
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
    return isAddedToCart
  }

  addToShoppingCartAndGoToOrderPage() {
    const isAddedToCart = this.addToShoppingCart()
    if (isAddedToCart) {
      this.router.navigate(['order', 'place-order'])
    }
  }
}
