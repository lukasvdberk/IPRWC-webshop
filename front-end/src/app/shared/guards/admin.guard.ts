import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../../authentication/authentication.service";
import {GuardUtil} from "./guard-util";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUrl = GuardUtil.getResolvedUrl(route);

    const jwtKey = this.authService.getJWTToken()
    const isAdmin = this.authService.isAdmin()
    if (jwtKey === '' || isAdmin === undefined) {
      this.router.navigate(['admin', 'signing'], {
        queryParams: {
          'redirectUrl': currentUrl
        }
      })
      return false
    }
    if (!isAdmin) {
      // TODO add redirect to error page with something like access denied
      this.router.navigate(['admin', 'signing'], {
        queryParams: {
          'redirectUrl': currentUrl
        }
      })
      return false
    }
    else{
      return true
    }
  }

}
