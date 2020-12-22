import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../product.service";
import {ToastService} from "../../shared/toast-service/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product-admin',
  templateUrl: './add-product-admin.component.html',
  styleUrls: ['./add-product-admin.component.css']
})
export class AddProductAdminComponent implements OnInit {
  @ViewChild('productForm') productForm: NgForm | undefined

  selectedImage: File | undefined
  constructor(private productService: ProductService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
  }

  onImageAdded(event: any): void {
    this.selectedImage = event.target.files[0]
  }
  onSubmit() {
    if (this.productForm !== undefined && this.selectedImage !== undefined) {
      console.log(this.productForm.value.image)
      this.productService.addProduct({
        name: String(this.productForm.value.name),
        price: +this.productForm.value.price,
        description: String(this.productForm.value.description),
      }, this.selectedImage).subscribe((response) => {
        this.toastService.showSuccess({
          message: 'Product added will be redirect in a couple of seconds',
          durationInSeconds: 3
        })
        setTimeout(() => {
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
