import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../product.service";
import {ToastService} from "../../shared/toast-service/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../product";

@Component({
  selector: 'app-edit-product-admin',
  templateUrl: './edit-product-admin.component.html',
  styleUrls: ['./edit-product-admin.component.css']
})
export class EditProductAdminComponent implements OnInit, OnDestroy {
  @ViewChild('productForm') productForm: NgForm | undefined

  selectedImage: File | undefined
  existingProduct: Product | undefined
  timeoutSubscription: any

  constructor(private productService: ProductService, private toastService: ToastService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
       this.productService.getProductById(params.productId).subscribe((product) => {
         this.existingProduct = product
       }, error => {
         if(error.status === 404) {
           this.toastService.showError({
             message: '404. Product not found',
             durationInSeconds: 10
           })
         }
       })
    });
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutSubscription)
  }

  onImageAdded(event: any): void {
    this.selectedImage = event.target.files[0]
  }

  onSubmit() {
    if (this.productForm !== undefined) {
      this.productService.editProduct({
        id: this.existingProduct?.id,
        name: String(this.productForm.value.name),
        price: +this.productForm.value.price,
        description: String(this.productForm.value.description),
      }, this.selectedImage).subscribe((response) => {
        this.toastService.showSuccess({
          message: 'Edited existing product. You will be redirected to the manage page',
          durationInSeconds: 3
        })
        this.timeoutSubscription = setTimeout(() => {
          this.router.navigate(['', 'products', 'manage'])
        }, 3000)
      }, (error) => {
        this.toastService.showError({
          message: 'Failed to add product. Please try again later!',
          durationInSeconds: 3
        })
      })
    }
  }
}
