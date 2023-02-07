import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient) {}

  search(data:any){
    return this.http.get(`${environment.url}/api/search/${data}`);
  }

  getEscalaDia(){
    return this.http.get(`${environment.url}/api/inicio-escaladia`);
  }

  getQuantPms(){
    return this.http.get(`${environment.url}/api/inicio-quantpms`);
  }

  getQuantAfast(){
    return this.http.get(`${environment.url}/api/inicio-quantafast`);
  }

  getQuantFerias(){
    return this.http.get(`${environment.url}/api/inicio-quantferias`);
  }

  getQuantVeiculos(){
    return this.http.get(`${environment.url}/api/inicio-quantveiculos`);
  }

  getSetores(){
    return this.http.get(`${environment.url}/api/inicio-setores`);
  }

  getGraduacoes(){
    return this.http.get(`${environment.url}/api/inicio-graduacoes`);
  }

  getMateriaisEmprestimos(){
    return this.http.get(`${environment.url}/api/inicio-materiais-emprestimos`);
  }

  getVeiculosEmprestimos(){
    return this.http.get(`${environment.url}/api/inicio-veiculos-emprestimos`);
  }

  getTrocaOleo(){
    return this.http.get(`${environment.url}/api/inicio-trocaoleo`);
  }

  getArmVencimentos(){
    return this.http.get(`${environment.url}/api/inicio-armamentos-vencimentos`);
  }

  getMatVencimentos(){
    return this.http.get(`${environment.url}/api/inicio-materiais-vencimentos`);
  }
}
