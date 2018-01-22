import { Component } from '@angular/core';
import { SessionService } from './services/session/session.service'


@Component({
  selector: 'app-root', //css selector
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CEN Product Explorer';
  isAdmin: Boolean;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.adminLogged$
      .subscribe(newValue => {
          this.isAdmin = newValue;
        });
    this.sessionService.userLogin();
  }

  setLoginAdmin(): void {
    this.sessionService.adminLogin();
  }

  setLoginUser(): void {
    this.sessionService.userLogin();
  }



}
