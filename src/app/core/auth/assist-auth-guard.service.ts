import { AuthzService } from './../../shared/authz/authz.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssistAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authzService: AuthzService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // console.log('AuthGuard#canActivate called');

    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      return true;
      // return this.authzService.hasAnyPermission(['*']);
    }

    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    // this.router.navigate(['/login']);
    // return false;

    return this.authService.stats()
    // .mergeMap((isLogin) => {
    //   return this.authzService.hasAnyPermission(['*']);
    // });
  }
}
