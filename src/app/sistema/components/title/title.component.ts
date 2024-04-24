import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrl: './title.component.css',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class TitleComponent{
    @Input() titulo!: string;
}