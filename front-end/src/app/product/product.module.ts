import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import {RouterModule, Routes} from "@angular/router";
import { ProductCustomerComponent } from './products-customer/product-customer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "./product.service";
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {SharedModule} from "../shared/shared.module";
import { ManageProductsComponent } from './products-admin/manage-products.component';
import {AdminGuard} from "../shared/guards/admin.guard";
import { AddProductAdminComponent } from './add-product-admin/add-product-admin.component';
import { EditProductAdminComponent } from './edit-product-admin/edit-product-admin.component';

let routes: Routes = [
  {
    path: "products/add", component: AddProductAdminComponent, canActivate: [AdminGuard]
  },
  {
    path: "products/edit/:productId", component: EditProductAdminComponent, canActivate: [AdminGuard]
  },
  {
    path: "products/manage", component: ManageProductsComponent, canActivate: [AdminGuard]
  },
  {
    path: "product/:id", component: ProductDetailComponent
  },
  {
    path: "", component: ProductCustomerComponent
  },
]

@NgModule({
  declarations: [
    ProductComponent,
    ProductCustomerComponent,
    ProductDetailComponent,
    ManageProductsComponent,
    AddProductAdminComponent,
    EditProductAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ProductComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
