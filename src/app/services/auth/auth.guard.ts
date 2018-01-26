import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router,private authService:AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.authService.loggedIn);
    if (this.authService.hasToken()) {
      return true;
    }
    this.authService.logout();
    return false;
  }
}