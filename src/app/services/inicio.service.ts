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

  getEscalaDia(){
    return this.http.get(environment.url+"inicio-escaladia");
  }

  getQuantPms(){
    return this.http.get(environment.url+"inicio-quantpms");
  }

  getQuantAfast(){
    return this.http.get(environment.url+"inicio-quantafast");
  }

  getQuantFerias(){
    return this.http.get(environment.url+"inicio-quantferias");
  }

  getQuantVeiculos(){
    return this.http.get(environment.url+"inicio-quantveiculos");
  }

  getSetores(){
    return this.http.get(environment.url+"inicio-setores");
  }

  getMateriaisEmprestimos(){
    return this.http.get(environment.url+"inicio-materiais-emprestimos");
  }

  getVeiculosEmprestimos(){
    return this.http.get(environment.url+"inicio-veiculos-emprestimos");
  }

  getTrocaOleo(){
    return this.http.get(environment.url+"inicio-trocaoleo");
  }

  getArmVencimentos(){
    return this.http.get(environment.url+"inicio-armamentos-vencimentos");
  }

  getMatVencimentos(){
    return this.http.get(environment.url+"inicio-materiais-vencimentos");
  }
}
