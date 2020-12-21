import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  login(user: User) {
    return this.httpClient.post('auth/login', user)
      .pipe(tap(
        (response: any) => {
          this.saveAuthentication(response.key, response.isAdmin)
        }
      ));
  }

  saveAuthentication(jwtKey: string, isAdmin: boolean) {
    localStorage.setItem('jwtKey', jwtKey)
    // TODO maybe save the whole user here.
    localStorage.setItem('isAdmin', String(isAdmin));
  }

  getJWTToken(): string {
    try {
      const jwtToken = localStorage.getItem('jwtKey') as string;
      if (jwtToken === null || jwtToken === undefined) {
        return '';
      }
      return jwtToken;
    } catch (e) {
      return '';
    }
  }
}
