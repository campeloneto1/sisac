import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrl: './title.component.css',
    standalone: true,
    imports: [CommonModule]
})
export class TitleComponent{
    @Input() titulo!: string;
}