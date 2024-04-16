import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { User, Users } from "./user";
import { Observable, tap } from "rxjs";
import { UsersService } from "./users.service";
import { TitleComponent } from "../../components/title/title.component";
import { DataTablesModule } from "angular-datatables";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { UsersFormComponent } from "./formulario/users-form.component";
import { ToastrService } from "ngx-toastr";
import { SharedService } from "../../shared/shared.service";
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
        NgxMaskPipe,
        UsersFormComponent
    ],
    providers:[
        UsersService, 
        provideNgxMask(),
    ]
})
export class UsersComponent implements OnInit{

    protected data$!: Observable<Users>;
    protected excluir!: User;
  protected dtOptions!: any;

  @ViewChild(UsersFormComponent) child!: UsersFormComponent;


    constructor(
      private usersService:UsersService,
      private toastr: ToastrService,
      private sharedService: SharedService
    ){}

    ngOnInit(): void {
        
      this.dtOptions = this.sharedService.getDtOptions();

      this.data$ = this.usersService.index().pipe(
        tap(() => {
          setTimeout(() => {
            $('#datatableexample').DataTable(this.dtOptions);
          }, 1);
        })
      );
    }

    refresh() {
      this.data$ = this.usersService.index().pipe(
        tap(() => {
          setTimeout(() => {
            $('#datatableexample').DataTable().destroy();
            $('#datatableexample').DataTable(this.dtOptions);
          }, 1);
        })
      );
    }

    editar(data: User) {
      this.child.editar(data);
    }
  
    delete(data: User) {
      this.excluir = data;
    }

    confirm() {
      this.usersService.remove(this.excluir.id || 0).subscribe({
        next: (data: any) => {
          this.toastr.success('Exclusão realizada com sucesso!');
          this.refresh();
        },
        error: (error: any) => {
          this.toastr.error('Erro ao excluir, tente novamente mais tarde!');
        },
      });
    }

}