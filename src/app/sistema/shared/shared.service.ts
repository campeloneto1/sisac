import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from 'datatables.net';
import { environment } from "../../../environments/environments";
import 'pdfmake/build/pdfmake'; // Importa pdfmake
import 'pdfmake/build/vfs_fonts'; // Importa as fontes do pdfmake
const URL = environment.url;

@Injectable({
    providedIn: 'root'
})

export class SharedService{

    constructor(
      private http: HttpClient,
  ){}

    protected dtOptions: Config = {
        pageLength: 10,
        order: [0, 'desc'],
        dom: 'Bfrtip',
        //@ts-ignore
        buttons: [
          {
            extend: 'colvis',
            className: 'btn btn-info'
          },
          {
            extend: 'copy',
            className: 'btn btn-info' // Adiciona a classe do Bootstrap ao botão
          },
          {
            extend: 'csv',
            text: 'CSV',
            fieldSeparator: ';',
            exportOptions: [1, 2, 3],
            className: 'btn btn-info'
          },
          {
            extend: 'excel',
            className: 'btn btn-info' // Adiciona a classe do Bootstrap ao botão
          },
          {
            extend: 'pdfHtml5',
            text: 'PDF',
            title: 'Relatório PDF - SISAC', // Título do PDF
            orientation: 'landscape', // Orientação da página
            pageSize: 'A4', // Tamanho da página
             className: 'btn btn-info',
            exportOptions: {
              // Configura quais colunas incluir na exportação
              columns: ':visible'
            }
          }
        ]
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