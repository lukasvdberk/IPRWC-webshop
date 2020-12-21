import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RequiresUserGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUrl = this.getResolvedUrl(route);
    console.log(currentUrl)

    const jwtKey = this.authService.getJWTToken()
    if (jwtKey === '') {
      // TODO add redirect url shizzle
      this.router.navigate(['customer', 'register'])
      return false
    } else{
      return true
    }
  }

  getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');
  }
}
