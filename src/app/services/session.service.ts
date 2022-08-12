import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private user: any;
  private token: any;

  constructor(private http: HttpClient) { }

  check(){
    if(this.token){
      return true;
    }else{
      if(localStorage.getItem('token')){
        this.setToken(localStorage.getItem('token'));
        var teste = this.http.get(environment.url+"check").subscribe(data => {
          this.setUser(data)
          //console.log(data);
          return true;
        });
        
        return teste;
      }else{
        return false;
      }
      
    }
  }

  setSession(data:any){
    this.user = data.user;
    this.token = data.token;
    localStorage.setItem('token', data.token);
  }

  setUser(data:any){
    this.user = data;
  }

  getUser(){
    return this.user;
  }

  setToken(data:any){
    this.token = data;
  }

  getToken(){
    return this.token;
  }
}
