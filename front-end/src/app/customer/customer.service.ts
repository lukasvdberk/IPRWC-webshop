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
        }
      ));
  }

  getCustomer(): Observable<Customer>{
      // if local does not exist then we fetch from remote
      return this.httpClient.get<Customer>('customer/me')
  }
}
