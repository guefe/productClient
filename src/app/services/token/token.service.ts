import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config/config'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TokenResponse} from './token'
import { SessionService } from '../session/session.service'

@Injectable()
export class TokenService {
  isAdmin: Boolean;
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.sessionService.adminLogged$
      .subscribe(newValue => {
          this.isAdmin = newValue;
        });
  }

    ngOnInit() {
      this.sessionService.adminLogged$
        .subscribe(newValue => {
            this.isAdmin = newValue;
          });
    }

  // getToken(): Observable<string> {
  //   let token = localStorage.getItem("token");
  //   token = null;
  //   if ( token ){
  //     return of(token);
  //   } else {
  //     // Ask for user token by default
  //     this.createToken(false).subscribe(resp => resp.access_token);
  //
  //   }
  // }

  createToken(): Observable<TokenResponse> {
    const basicAuth = btoa(`${config.client_id}:${config.client_secret}`)
    let body ;
    if (this.isAdmin){
      body = `grant_type=${config.grant_type}&username=${config.admin.username}&password=${config.admin.password}`;
    } else {
      body = `grant_type=${config.grant_type}&username=${config.user.username}&password=${config.user.password}`;
    }

    let headers = {
      headers: new HttpHeaders().set('Authorization', `Basic ${basicAuth}`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http
      .post<TokenResponse>(config.api_url+"oauth/token", body, headers);
  }
}
