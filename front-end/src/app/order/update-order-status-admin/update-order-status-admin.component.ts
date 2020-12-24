import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OrderItem} from "../../shared/models/order-item";
import {NgForm} from "@angular/forms";
import {OrderService} from "../order.service";
import {Order} from "../order";
import {ToastService} from "../../shared/toast-service/toast.service";

@Component({
  selector: 'app-update-order-status-admin',
  templateUrl: './update-order-status-admin.component.html',
  styleUrls: ['./update-order-status-admin.component.css']
})
export class UpdateOrderStatusAdminComponent implements OnInit {
  @Input() order: Order | undefined
  @ViewChild('orderStatusForm') statusOrderForm: NgForm | undefined

  constructor(private orderService: OrderService, private toastService: ToastService) { }
  orderStatusOptions = [
    {
      name: "Processing",
      value: "PROCESSING"
    },
    {
      name: "Delivering",
      value: "DELIVERING"
    },
    {
      name: "Delivered",
      value: "DELIVERED"
    },
  ]
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.order && this.order.id && this.statusOrderForm) {
      console.log(this.statusOrderForm.value.status)
      this.orderService.updateOrderStatus(this.order.id, this.statusOrderForm.value.status).subscribe((response) => {
        this.toastService.showSuccess({
          durationInSeconds: 4,
          message: 'Order status updated!'
        })
      }, error => {
        this.toastService.showError({
          durationInSeconds: 4,
          message: 'Failed to update order status. Try again later.'
        })
      });
    }
  }
}
