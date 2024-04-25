import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private token!: any;
    private user!: any;

    constructor(
        private storageService: StorageService,
        private router: Router,
    ){
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

    checkPermission(data:string){
        if(!this.user.perfil[data]){
            this.router.navigate(['Inicio']);
        }
    }

    logout(){
        this.token = '';
        this.user = {};
        this.storageService.clearStorage();
    }
}