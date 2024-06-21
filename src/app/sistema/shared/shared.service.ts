import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from 'datatables.net';
import { environment } from "../../../environments/environments";

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})

export class SharedService{

    constructor(
      private http: HttpClient,
  ){}

    protected dtOptions: Config = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        paging: true
      };    

      getDtOptions(){
        return this.dtOptions;
      }

      uploadFoto(data: any){
        return this.http.post(`${URL}/utilities/upload`, data);
    }
}   