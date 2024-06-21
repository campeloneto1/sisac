import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { MaterialPolicial, MateriaisPoliciais } from "./material-policial";
import { Observable } from "rxjs";
import { SessionService } from "../../session.service";

const URL = environment.url;
const endPoint = 'materiais-policiais';

@Injectable({
    providedIn: 'root'
})
export class MateriaisPoliciaisService{

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
    ){}

    index(): Observable<MateriaisPoliciais>{
        //return this.http.get<MateriaisPoliciais>(`${URL}/${endPoint}`);
        return this.http.get<MateriaisPoliciais>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<MaterialPolicial>{
        return this.http.get<MaterialPolicial>(`${URL}/${endPoint}/${id}`);
    }

    create(data: MaterialPolicial){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: MaterialPolicial){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    receber(data:any){
        return this.http.post(`${URL}/${endPoint}/receber`, data);
    }
   
}