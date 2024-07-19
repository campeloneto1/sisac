import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { SharedService } from "./shared/shared.service";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private token!: any;
    private user!: any;
    private subunidade!: any;

    constructor(
        private storageService: StorageService,
        private sharedService: SharedService,
        private router: Router,
    ){
        if(!this.user && this.storageService.getItem('user')){
            try{
                this.user = JSON.parse(this.storageService.getItem('user')!);
            }catch(e:any){
                this.user = {};
            }
        }

        if(!this.token && this.storageService.getItem('token')){
            this.token = this.storageService.getItem('token')!;
        }

        if(!this.subunidade && this.storageService.getItem('subunidade')){
            this.subunidade = this.storageService.getItem('subunidade')!;
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

    getSubunidade(){
        return this.subunidade;
    }

    check(){
        return this.token ? true : false;
    }

    redirect(){
        this.router.navigate(['Inicio']);
    }

    checkPermission(data:string){
        if(!this.user.perfil[data]){
            this.router.navigate(['Inicio']);
        }
    }

    logout(){
        this.token = '';
        this.subunidade = '';
        this.user = {};
        this.storageService.clearStorage();
    }
}