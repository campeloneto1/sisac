import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    standalone: true,
    imports: [CommonModule, RouterModule]
})

export class SidebarComponent implements OnInit{

    private routesMenuAdm = [
        '/Graduacoes',
        '/Cidades',
        '/Estados',
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
        private router: Router
    ){}

    ngOnInit(): void {
        this.routesMenuAdm.includes(this.router.url) ? this.menuAdmin = true : this.menuAdmin = false;
        this.routesMenuGestor.includes(this.router.url) ? this.menuGestor = true : this.menuGestor = false;
    }

    openMenuAdmin(){
        this.menuAdmin = !this.menuAdmin;
    }
    
    openMenuGestor(){
        this.menuGestor = !this.menuGestor;
    }
}