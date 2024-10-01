import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { User } from "../../views/users/user";
import { SessionService } from "../../session.service";
import { StorageService } from "../../storage.service";
import { NavItemComponent } from "../nav-item/nav-item.component";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule,
        NavItemComponent
    ]
})

export class SidebarComponent implements OnInit{

    protected user!: User;

    private routesMenuAdm = [
        '/AfastamentosTipos',
        '/ArmamentosCalibres',
        '/ArmamentosTamanhos',
        '/ArmamentosTipos',
        '/Bancos',
        '/Cidades',
        '/ContratosObjetos',
        '/ContratosTipos',
        '/Cores',
        '/Cursos',
        '/DocumentosTipos',
        '/Escolaridades',
        '/Estados',
        
        '/Graduacoes',
        '/Logs',
        '/ManutencoesTipos',
        '/Marcas',
        '/MateriasConsumoTipos',
        '/MateriasTipos',
        '/Modelos',
        
        '/PatrimoniosTipos',
        '/Paises',
        '/Perfis',
        '/PublicacoesTipos',
        '/ServicosTipos',
        '/Sexos',
        '/Subunidades',
        '/Setores',
        '/Unidades',
        '/VeiculosTipos',
    ]
    protected menuAdmin:boolean = false;

    private routesMenuGestor = [
        '/Funcoes',
        '/Oficinas'
    ]
    protected menuGestor:boolean = false;

    private routesMenuRelatorio = [
        '/RelArmamentos',
        '/RelArmamentosEmprestimos',
        '/RelContratos',
        '/RelPatrimonios',
        '/RelPoliciais',
        '/RelPoliciaisAfastamentos',
        '/RelPoliciaisFerias',
        '/RelServicos',
        '/RelVeiculos',
        '/RelVeiculosEmprestimos',
        '/RelVeiculosOficinas',
    ]
    protected menuRelatorio:boolean = false;

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private storageService: StorageService
    ){}

    async ngOnInit(){
        this.routesMenuAdm.includes(this.router.url) ? this.menuAdmin = true : this.menuAdmin = false;
        this.routesMenuGestor.includes(this.router.url) ? this.menuGestor = true : this.menuGestor = false;
        this.routesMenuRelatorio.includes(this.router.url) ? this.menuRelatorio = true : this.menuRelatorio = false;

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

    openMenuRelatorio(){
        this.menuRelatorio = !this.menuRelatorio;
    }
}