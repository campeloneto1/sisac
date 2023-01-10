import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from '../services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token$: any;

  constructor(private session: SessionService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //console.log(request);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.session.getToken()}`,
        // Website you wish to allow to connect
      }
      
    });
    return next.handle(request);
  }
}
