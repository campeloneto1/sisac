import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { InfoBox } from "../../components/info-box/info-box.component";
import { SessionService } from "../../session.service";
import { User } from "../users/user";
import { HomeService } from "./home.service";
import { Observable } from "rxjs";
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

    protected subscription: any;
    protected subscription2: any;
    protected subscription3: any;

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

        this.subscription = this.homeService.getAtestados().subscribe({
            next: (data) => {
                this.quantAtestados = data;
            }
        });

        this.subscription = this.homeService.getFerias().subscribe({
            next: (data) => {
                this.quantFerias = data;
            }
        });
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
    }
}