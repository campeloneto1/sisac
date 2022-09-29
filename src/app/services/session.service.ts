import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private user: any;
  private token: any;

  constructor(private http: HttpClient) {
    try {
      //console.log(sessionStorage.getItem('usuario'));
      var temp = localStorage.getItem('token')?.length;
      var temp2 = localStorage.getItem('user')?.length;
      if (localStorage.getItem('user')) {
        //@ts-ignore
        this.setUser(JSON.parse(atob(localStorage.getItem('user')?.substr(0, temp2 - 3))));
      }

      if (localStorage.getItem('token')) {
        //@ts-ignore
        this.setToken(atob(localStorage.getItem('token')?.substr(0, temp - 3)));
      }
    }
    catch (e) {
      //localStorage.clear();
    }
  }

  check() {
    if (localStorage.getItem('token')) {
      return true;
    }else{
      return false;
    }
  }

  setSession(data: any) {
    this.user = data.user;
    this.token = data.token;
    localStorage.setItem('token', btoa(data.token) + 'A4A');
    localStorage.setItem('user', btoa(JSON.stringify(data.user)) + 'APM');
  }

  setUser(data: any) {
    this.user = data;
  }

  getUser() {
    return this.user;
  }

  setToken(data: any) {
    this.token = data;
  }

  getToken() {
    return this.token;
  }

  logout() {
    localStorage.clear();
    var teste = this.http
      .get(environment.url + 'logout')
      .subscribe((data) => {
        this.token = null;
        this.user = null;
        //console.log(data);      
      });
  }
}
