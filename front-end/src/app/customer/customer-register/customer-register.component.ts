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
  selectedCountry: string | undefined

  @Output() registered: EventEmitter<void> = new EventEmitter();

  @ViewChild('customerRegisterForm') orderForm: NgForm | any;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country.name
  }

  onSubmit() {
    const customer = this.orderForm.form.value

    customer.user = {
      email: this.orderForm.form.value.email,
      password: this.orderForm.form.value.password,
    }
    customer.country = this.selectedCountry
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
