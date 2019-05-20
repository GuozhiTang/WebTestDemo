import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router
  ) {}

  /**
   * We put our logic of routes here
   */
  canActivate() {
    if (this.authService.isTokenExp()) {
      // Re-direct our route
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}