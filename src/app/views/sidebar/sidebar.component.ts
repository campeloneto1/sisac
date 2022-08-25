import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu1 = false;
  menu2 = false;

  constructor() { 
    this.menu1 = false;
    this.menu2 = false;
  }

  ngOnInit(): void {
  }

}
