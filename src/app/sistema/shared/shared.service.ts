import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SharedService{

    protected dtOptions: any = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        responsive: true,
        paging: true
      };    

      getDtOprtions(){
        return this.dtOptions;
      }
}   