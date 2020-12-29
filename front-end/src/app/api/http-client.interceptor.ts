import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../authentication/authentication.service";

// Sets jwt token and base url
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthenticationService,
    @Inject('BASE_API_URL') private baseUrl: string) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({
      url: `${this.baseUrl}/${request.url}`,
      headers: request.headers.set('Bearer-token', this.authService.getJWTToken())
    });
    return next.handle(apiReq);
  }
}
