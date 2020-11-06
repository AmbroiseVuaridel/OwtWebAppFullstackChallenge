import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserDataService} from '../services/user-data.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userData: UserDataService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.userData.getUser();
    if (user) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
