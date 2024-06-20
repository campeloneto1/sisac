import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { UserSubunidade, UsersSubunidades } from "./user-subunidade";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'users-subunidades';

@Injectable({
    providedIn: 'root'
})
export class UsersSubunidadesService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<UsersSubunidades>{
        return this.http.get<UsersSubunidades>(`${URL}/${endPoint}`);
    }

    find(id: number): Observable<UserSubunidade>{
        return this.http.get<UserSubunidade>(`${URL}/${endPoint}/${id}`);
    }

    create(data: UserSubunidade){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: UserSubunidade){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }
   
}