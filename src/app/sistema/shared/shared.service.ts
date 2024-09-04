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

    encodeId(id: any){
      var encoded = window.btoa(id);
      return encoded;
    }

    decodeId(id: any){
      try{
        var decoded = window.atob(id);
        return decoded;
      }catch(e:any){
        return null;
      }
      
    }

    generateSalt(length:number){
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }

  getFile(file: any){
    return this.http.post(`${URL}/utilities/getfile`, file, {responseType: 'blob'});
}
}   