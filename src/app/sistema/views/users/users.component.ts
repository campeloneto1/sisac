import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Users } from "./user";
import { Observable, tap } from "rxjs";
import { UsersService } from "./users.service";
import { TitleComponent } from "../../components/title/title.component";
import { DataTablesModule } from "angular-datatables";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    standalone: true,
    imports: [
        CommonModule, 
        TitleComponent, 
        DataTablesModule,
        NgxMaskDirective, 
        NgxMaskPipe
    ],
    providers:[
        UsersService, 
        provideNgxMask(),
    ]
})
export class UsersComponent implements OnInit{

    protected data$!: Observable<Users>;

    constructor(private usersService:UsersService){}

    ngOnInit(): void {
        
       // this.data$ = this.usersService.index();

        this.data$ = this.usersService.index().pipe(
        tap(() => {
            setTimeout(()=>{   
                $('#datatableexample').DataTable( {
                 pagingType: 'full_numbers',
                 pageLength: 10,
                 processing: true,
                 lengthMenu : [10, 25, 50, 100],
             } );
             }, 1);
        })
        );
    }

}