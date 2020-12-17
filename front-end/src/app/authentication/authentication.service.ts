import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  saveAuthentication(jwtKey: string, isAdmin: boolean) {
    localStorage.setItem('jwtKey', jwtKey)
    // TODO maybe save the whole user here.
    localStorage.setItem('isAdmin', String(isAdmin));
  }
}
