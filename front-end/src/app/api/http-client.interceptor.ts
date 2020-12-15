import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
// import {AuthService} from '../authentication/auth.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({
      url: `${this.baseUrl}/${request.url}`,
      // headers: request.headers.set('Bearer-token', this.authService.getJWTToken())
    });
    return next.handle(apiReq);
  }
}
