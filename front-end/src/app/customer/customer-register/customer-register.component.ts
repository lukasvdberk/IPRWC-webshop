import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CustomerService} from "../customer.service";
import {OrderItem} from "../../shared/models/order-item";

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  errorMessage = ''

  @Output() registered: EventEmitter<void> = new EventEmitter();

  @ViewChild('customerRegisterForm') orderForm: NgForm | any;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const customer = this.orderForm.form.value
    console.log(customer)

    customer.user = {
      email: this.orderForm.form.value.email,
      password: this.orderForm.form.value.password,
    }
    this.customerService.registerCustomer(
      customer
    ).subscribe(
      (response) => {
        this.registered.emit()
      },
      (error) => {
        this.errorMessage = 'User with given email already exists!'
      }
    )
  }
}
