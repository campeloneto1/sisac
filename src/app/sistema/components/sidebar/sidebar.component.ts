import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { User } from "../../views/users/user";
import { SessionService } from "../../session.service";
import { StorageService } from "../../storage.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    standalone: true,
    imports: [CommonModule, RouterModule]
})

export class SidebarComponent implements OnInit{

    protected user!: User;

    private routesMenuAdm = [
        '/ArmamentosTipos',
        '/ArmamentosCalibres',
        '/ArmamentosTamanhos',
        '/Graduacoes',
        '/Cidades',
        '/Estados',
        '/Marcas',
        '/Modelos',
        '/Paises',
        '/Perfis',
        '/PublicacoesTipos',
        '/Sexos',
        '/Subunidades',
        '/Setores',
        '/Unidades',
    ]
    protected menuAdmin:boolean = false;

    private routesMenuGestor = [
        '/Usuarios'
    ]
    protected menuGestor:boolean = false;

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private storageService: StorageService
    ){}

    async ngOnInit(){
        this.routesMenuAdm.includes(this.router.url) ? this.menuAdmin = true : this.menuAdmin = false;
        this.routesMenuGestor.includes(this.router.url) ? this.menuGestor = true : this.menuGestor = false;

        this.user = this.sessionService.getUser();
        
        if(!this.user){
            this.user = JSON.parse(await this.storageService.getItem('user')!);
        }
    }

    openMenuAdmin(){
        this.menuAdmin = !this.menuAdmin;
    }
    
    openMenuGestor(){
        this.menuGestor = !this.menuGestor;
    }
}