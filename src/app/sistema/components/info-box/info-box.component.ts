import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-info-box',
    templateUrl: './info-box.component.html',
    styleUrl: './info-box.component.css',
    standalone: true,
    imports: [CommonModule, RouterModule,]
})
export class InfoBox implements OnInit{
    @Input() titulo!:string;
    @Input() subtitulo!:string;
    @Input() icon!:string;
    @Input() class!:string;
    @Input() route!:string;
    @Input() params!:object;


    constructor(){}
    ngOnInit(): void {
    }
}