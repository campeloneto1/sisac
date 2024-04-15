import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
    selector: 'app-sistema',
    templateUrl: './sistema.component.html',
    styleUrl: './sistema.component.css',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, SidebarComponent]
})

export class SistemaComponent{}