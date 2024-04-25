import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-info-box',
    templateUrl: './info-box.component.html',
    styleUrl: './info-box.component.css',
    standalone: true,
    imports: [CommonModule]
})
export class InfoBox{
    @Input() titulo!:string;
    @Input() subtitulo!:string;
    @Input() icon!:string;
    @Input() class!:string;

    constructor(){}
}