import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu1 = false;
  menu2 = false;
  user: any;

  constructor(private session: SessionService) { 
    this.menu1 = false;
    this.menu2 = false;
    
      
    setTimeout( () => {
      this.user = this.session.getUser();
    }, 1000);
  }

  ngOnInit(): void {
    
    
  }

}
