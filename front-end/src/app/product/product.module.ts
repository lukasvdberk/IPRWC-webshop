import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import {RouterModule, Routes} from "@angular/router";
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCustomerComponent } from './product-customer/product-customer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "./product.service";
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {SharedModule} from "../shared/shared.module";
import {AppModule} from "../app.module";

let routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "product/:id", component: ProductDetailComponent
      },
      {
        path: "", component: ProductCustomerComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductCustomerComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
