import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "./auth";
import { environment } from "../../environments/environments";

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    constructor(
        private http: HttpClient,
    ){
        
    }

    entrar(data: Auth){
        return this.http.post(`${URL}/auth/login`, data);
    }

    profile(data: Auth){
        return this.http.post(`${URL}/auth/profile`, data);
    }
}