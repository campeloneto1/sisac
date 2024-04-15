import { Injectable, OnInit } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private token!: any;
    private user!: any;

    constructor(private storageService: StorageService){
        if(!this.user){
            this.user = JSON.parse(this.storageService.getItem('user')!);
        }

        if(!this.token){
            this.token = this.storageService.getItem('token')!;
        }
    }

    setSession(user:any, token: string){
        this.user = user;
        this.token = token;
    }

    getUser(){
        return this.user;
    }

    getToken(){
        return this.token;
    }

    check(){
        return this.token ? true : false;
    }

    logout(){
        this.token = '';
        this.user = {};
        this.storageService.clearStorage();
    }
}