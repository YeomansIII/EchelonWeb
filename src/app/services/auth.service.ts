import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  loggedIn: boolean = false;

  constructor(public af: AngularFire,
              public router: Router) {
    af.auth.subscribe(user => {
      if (user) {
        this.loggedIn = true;
      }
    });
  }
}
