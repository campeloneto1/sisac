import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { User, Users } from "./user";
import { Observable } from "rxjs";

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class UsersService{

    constructor(
        private http: HttpClient,
    ){}

    index(): Observable<Users>{
        return this.http.get<Users>(`${URL}/users`);
    }

    find(id: number): Observable<User>{
        return this.http.get<User>(`${URL}/users/${id}`);
    }

    create(data: User):void{
        this.http.post(`${URL}/users`, data);
    }

    update(id:number, data: User):void{
        this.http.put(`${URL}/users/${id}`, data);
    }

    remove(id:number, data: User):void{
        this.http.delete(`${URL}/users/${id}`);
    }
   
}