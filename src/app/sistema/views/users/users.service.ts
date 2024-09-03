import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { User, Users } from "./user";
import { Observable } from "rxjs";
import { SessionService } from "../../session.service";

const URL = environment.url;
const endPoint = 'users';

@Injectable({
    providedIn: 'root'
})
export class UsersService{

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
    ){}

    index(): Observable<Users>{
        //return this.http.get<Users>(`${URL}/${endPoint}`);
        return this.http.get<Users>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<User>{
        return this.http.get<User>(`${URL}/${endPoint}/${id}`);
    }

    create(data: User){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: User){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    reset(data: User){
        return this.http.post(`${URL}/${endPoint}/reset`, data);
     }

     change(data: any){
        return this.http.post(`${URL}/${endPoint}/change`, data);
     }

     verificarSenha(data: any){
        return this.http.post(`${URL}/${endPoint}/verificarsenha`, data);
     }
}