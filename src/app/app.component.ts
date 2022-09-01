import { Component, OnInit  } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sisac';
  token: any = false;
  logado: any = false;
  route: any;
  constructor(private session: SessionService,
    private router: Router) {}

  ngOnInit(): void {
    this.token = this.session.check();
  }
}
