/*
 * @Description: The routes protection here to set the logic of routes
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:12:16
 */
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
   * Logic of routes here
   * Some components can only be accessed after successfully login
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