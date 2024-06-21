import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { VeiculoPolicial, VeiculosPoliciais } from "./veiculo-policial";
import { Observable } from "rxjs";

const URL = environment.url;
const endPoint = 'veiculos-policiais';

@Injectable({
    providedIn: 'root'
})
export class VeiculosPoliciaisService{

    constructor(
        private http: HttpClient,
        //private sessionService: SessionService,
    ){}

    index(): Observable<VeiculosPoliciais>{
        return this.http.get<VeiculosPoliciais>(`${URL}/${endPoint}`);
        // return this.http.get<VeiculosPoliciais>(`${URL}/${endPoint}?subunidade=${this.sessionService.getSubunidade()}`);
    }

    find(id: number): Observable<VeiculoPolicial>{
        return this.http.get<VeiculoPolicial>(`${URL}/${endPoint}/${id}`);
    }

    create(data: VeiculoPolicial){
       return this.http.post(`${URL}/${endPoint}`, data);
    }

    update(id:number, data: VeiculoPolicial){
        return this.http.put(`${URL}/${endPoint}/${id}`, data);
    }

    remove(id:number){
        return this.http.delete(`${URL}/${endPoint}/${id}`);
    }

    emprestados(): Observable<VeiculosPoliciais>{
        return this.http.get<VeiculosPoliciais>(`${URL}/${endPoint}/emprestados`);
        // return this.http.get<VeiculosPoliciais>(`${URL}/${endPoint}/emprestados?subunidade=${this.sessionService.getSubunidade()}`);
    }
   
    receber(data: any){
        return this.http.post(`${URL}/${endPoint}/receber`, data);
     }

     veiculoPolicial(): Observable<VeiculoPolicial>{
        return this.http.get<VeiculoPolicial>(`${URL}/${endPoint}/emprestadopolicial`);
        // return this.http.get<VeiculoPolicial>(`${URL}/${endPoint}/emprestadopolicial?subunidade=${this.sessionService.getSubunidade()}`);
     }
}