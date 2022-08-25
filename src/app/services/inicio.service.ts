import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient) {}

  getPm(){
    return this.http.get(environment.url+"inicio-getpm");
  }

  getAfast(){
    return this.http.get(environment.url+"inicio-afast");
  }
}
