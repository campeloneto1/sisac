import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SessionService } from "../../session.service";
import { StorageService } from "../../storage.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: true,
    imports: [CommonModule,],
    providers: [Router]
})

export class NavbarComponent implements OnInit{

    user!: any;

    protected form!: FormGroup;

    constructor(
        private sessionService: SessionService,
        private storageService: StorageService,
        private router: Router,
    ){}

    async ngOnInit() {
        this.user = this.sessionService.getUser();
        
        if(!this.user){
            this.user = JSON.parse(await this.storageService.getItem('user')!);
        }
    }

    logout(){
        this.sessionService.logout();
        this.router.navigate(['auth']);
    }

    alterarSenha(){
      
    }
}