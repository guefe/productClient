import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SessionService {
  public adminLogged$: Subject<boolean> = new BehaviorSubject(false);

  constructor() { }

  // isAdminLogged(): Boolean{
  //   return this.adminLogged.subscribe((value)=> return value;);
  // }

  adminLogin(): void{
    this.adminLogged$.next(true);
  }

  userLogin(): void{
    this.adminLogged$.next(false);
  }
}
