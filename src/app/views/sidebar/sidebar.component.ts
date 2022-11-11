import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu1 = false;
  menu2 = false;
  menu3 = false;
  user: any;
  url = environment.imagens;
  constructor(private session: SessionService) { 
    this.menu1 = false;
    this.menu2 = false;
    this.menu3 = false;
    this.user = this.session.getUser();
  }

  ngOnInit(): void {

  }

}
