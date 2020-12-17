import {Injectable} from "@angular/core";
import {Customer} from "./customer";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../authentication/authentication.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient:HttpClient, private authService: AuthenticationService) {}

  registerCustomer(customer: Customer) : Observable<any> {
    const customerToSend: any = customer

    // Since the api expects email and password on 1 object and not on user
    customerToSend.email = customer.user.email;
    customerToSend.password = customer.user.password;
    return this.httpClient.post('auth/register', customerToSend)
      .pipe(tap(
        (response: any) => {
          this.authService.saveAuthentication(response.key, response.isAdmin)
          this.saveCustomer(customer)
          console.log(this.getCustomer())
        }
      ));
  }

  private saveCustomer(customer: Customer): void {
    // we never want to save the password to localstorage
    customer.user.password = ""
    localStorage.setItem('currentCustomer', JSON.stringify(customer))
  }

  getCustomer(): Customer | undefined{
    try {
      const customer = localStorage.getItem('currentCustomer')
      if(!customer) {
        return undefined
      }
      return JSON.parse(customer) as Customer
    }
     catch (e) {
      return undefined
    }
  }
}
