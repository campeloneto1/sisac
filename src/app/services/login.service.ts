import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: any){    
    return this.http.post(`${environment.url}/api/login`, data);
  }

  logout(){    
    return this.http.get(`${environment.url}/api/logout`);
  }
}
