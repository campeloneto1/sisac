import { Injectable } from "@angular/core";
import { Config } from 'datatables.net';

@Injectable({
    providedIn: 'root'
})

export class SharedService{

    protected dtOptions: Config = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        paging: true
      };    

      getDtOptions(){
        return this.dtOptions;
      }
}   