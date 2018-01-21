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
    // localStorage.setItem("token", "364db7d3-8745-4f1a-9c66-3b9c4edb5ef7");
    // this.getToken();
    this.sessionService.adminLogged$
      .subscribe(newValue => {
          this.isAdmin = newValue;
        });
    this.sessionService.userLogin();
  }

  setLoginAdmin(): void {
    // this.isAdmin = true;
    this.sessionService.adminLogin();
  }

  setLoginUser(): void {
    // this.isAdmin = false;
    this.sessionService.userLogin();
  }

  // isAdminLogged(): Boolean {
  //   return this.sessionService.isAdminLogged();
  // }


}
