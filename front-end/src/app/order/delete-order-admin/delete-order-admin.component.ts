import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Order} from "../order";
import {ToastService} from "../../shared/toast-service/toast.service";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-delete-order-admin',
  templateUrl: './delete-order-admin.component.html',
  styleUrls: ['./delete-order-admin.component.css']
})
export class DeleteOrderAdminComponent implements OnInit {
  @Input() order: Order | undefined

  constructor(private toastService: ToastService, private orderService: OrderService, private location: Location) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.order && this.order.id) {
      this.orderService.deleteOrder(this.order.id).subscribe((response) => {
        this.location.back()
        this.toastService.showSuccess({
          durationInSeconds: 4,
          message: 'Order status updated!'
        })
      }, error => {
        this.toastService.showError({
          durationInSeconds: 4,
          message: 'Failed to delete order. Try logging back in again.'
        })
      });
    }
  }
}
