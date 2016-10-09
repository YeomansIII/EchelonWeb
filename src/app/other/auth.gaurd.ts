import {Injectable}             from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}    from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private AuthService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.AuthService.af.auth.map((auth) => {
      if (!auth) {
        this.router.navigateByUrl('login');
        return false;
      }
      return true;
    });
  }
}
