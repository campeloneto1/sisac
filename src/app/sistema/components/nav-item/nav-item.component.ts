import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'nav-item',
    templateUrl: './nav-item.component.html',
    styleUrl: './nav-item.component.css',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class NavItemComponent{
    @Input() link!: string;
    @Input() label!: string;
    @Input() icon!: string;
}