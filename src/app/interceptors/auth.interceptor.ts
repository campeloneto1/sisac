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
    this.token$ = this.session.getToken();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token$}`,
        // Website you wish to allow to connect
        

        // Request methods you wish to allow
       /* 'Access-Control-Allow-Origin': 'http://10.9.235.245:8080',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type'*/
      }
    });
    return next.handle(request);
  }
}
