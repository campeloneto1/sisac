import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    standalone: true,
    imports: [CommonModule, RouterModule]
})

export class SidebarComponent{
    
    protected menuadmin: boolean = false;
    
    
    openmenuadmin(){
        this.menuadmin = !this.menuadmin;
    }
}