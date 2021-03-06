/*
 * @Description: The navbar for the web application
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:15:13
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Operator } from '../../../models/Operator';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: String;
  operator: Operator;
  // departmemt: String;
  // user: {
  //   name: String;
  //   department: String;
  // };

  constructor(
    public authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) {
      // Get operator information in local database
      this.authService.getProfile().subscribe(profile => {
        // console.log(profile);
        this.operator = profile.operator;
        // console.log(this.operator);
      }
    )}

  ngOnInit() { }

  /**
   * Method to logout of the system and clear out the data in local storage
   */
  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    // this.router.navigate(['/login']);
    // window.location.href = "/login";
    window.location.href = "/webuigz/login";
    return false;
  }
}