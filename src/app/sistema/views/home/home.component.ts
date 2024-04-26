import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { InfoBox } from "../../components/info-box/info-box.component";
import { SessionService } from "../../session.service";
import { User } from "../users/user";
import { HomeService } from "./home.service";
import { Observable } from "rxjs";
import { Armamentos } from "../armamentos/armamento";
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true,
    imports: [CommonModule, InfoBox]
})

export class HomeComponent implements OnInit, OnDestroy{
    protected user!: User;

    protected quantPoliciais!: any;
    protected quantAtestados!: any;
    protected quantFerias!: any;
    protected policiaisSetores!: any;
    protected armamentosVencendo!: Armamentos;

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;
    protected subscription4: any;

    constructor(
        private sessionService: SessionService,
        private homeService: HomeService
    ){}

    ngOnInit(): void {
        this.user = this.sessionService.getUser();
        this.subscription = this.homeService.getPoliciais().subscribe({
            next: (data) => {
                this.quantPoliciais = data;
            }
        });

        this.subscription2 = this.homeService.getAtestados().subscribe({
            next: (data) => {
                this.quantAtestados = data;
            }
        });

        this.subscription3 = this.homeService.getFerias().subscribe({
            next: (data) => {
                this.quantFerias = data;
            }
        });

        this.subscription4 = this.homeService.getArmamentosVencendo().subscribe({
            next: (data) => {
                this.armamentosVencendo = data;
            }
        });

        // this.subscription4 = this.homeService.getPoliciaisSetores().subscribe({
        //     next: (data) => {
        //         this.policiaisSetores = data;
        //     }
        // });
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();
        }
        if(this.subscription3){
            this.subscription3.unsubscribe();
        }
        if(this.subscription4){
            this.subscription4.unsubscribe();
        }
    }
}