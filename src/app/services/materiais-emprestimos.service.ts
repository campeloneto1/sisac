import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaisEmprestimosService {

  constructor(private http: HttpClient) {}

  index(){
    return this.http.get(`${environment.url}/api/materiais-emprestimos`);
  }

  show(id:number){
    return this.http.get(`${environment.url}/api/materiais-emprestimos/${id}`);
  }

  where(id:number){
    return this.http.get(`${environment.url}/api/materiais-emprestimos/${id}/where`);
  }

  receber(data:any){
    return this.http.post(`${environment.url}/api/materiais-emprestimos-receber`, data);
  }

  store(data:any){
    return this.http.post(`${environment.url}/api/materiais-emprestimos`,data);
  }

  update(data:any,id:number){
    return this.http.put(`${environment.url}/api/materiais-emprestimos/${id}`,data);
  }

  destroy(id:number){
    return this.http.delete(`${environment.url}/api/materiais-emprestimos/${id}`);
  }
}
