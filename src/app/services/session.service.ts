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
        this.setUser(JSON.parse(atob(localStorage.getItem('user')?.substr(0, temp2 - 7))));
      }

      if (localStorage.getItem('token')) {
        //@ts-ignore
        this.setToken(atob(localStorage.getItem('token')?.substr(0, temp - 7)));
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

  makeid(length:any) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  setSession(data: any) {
    var string = this.makeid(7);
    var string2 = this.makeid(7);    
    var string3 = this.makeid(1);
    var string4 = this.makeid(1);  

    this.user = data.user;
    this.token = data.token;
    localStorage.setItem('token', btoa(data.token) + string);
    localStorage.setItem('user', btoa(JSON.stringify(data.user)) + string2);
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
      .get(`${environment.url}/api/logout`)
      .subscribe((data) => {
        this.token = null;
        this.user = null;
        //console.log(data);      
      });
  }
}
