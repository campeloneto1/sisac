import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient) {}

  search(data:any){
    return this.http.get(environment.url+"search/"+data);
  }

  getPm(){
    return this.http.get(environment.url+"inicio-getpm");
  }

  getAfast(){
    return this.http.get(environment.url+"inicio-afast");
  }

  getSetores(){
    return this.http.get(environment.url+"inicio-setores");
  }

  getEmprestimos(){
    return this.http.get(environment.url+"inicio-emprestimos");
  }

  getTrocaOleo(){
    return this.http.get(environment.url+"inicio-trocaoleo");
  }

  getVencimentos(){
    return this.http.get(environment.url+"inicio-vencimentos");
  }
}
