import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {mediaUrl} from "./image-url.pipe";

@NgModule({
  declarations: [
    mediaUrl
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    mediaUrl
  ]
})
export class SharedModule { }
