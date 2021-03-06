/*
 * @Description: The login page for the web application
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:14:49
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Add component properties
  name: String;
  // department: String;
  // departments: String[] = ['Manufacturing Dept', 'HT Assay Dept'];

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    ) { }

  ngOnInit() {
  }

  /**
   * Submit the login information to authenticate.
   */
  onLoginSubmit() {
    // console.log(this.username);
    const operator = {
      name: this.name
    }
    // data is what we store after sending this request
    this.authService.authenticateOperator(operator).subscribe(data => {
      // console.log(data);
      if (data.success) {
        // console.log(data);
        this.authService.storeUserData(data.token, data.operator);
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
          // this.router.navigate(['/dashboard']);
          // window.location.href = "/dashboard";
          window.location.href = "/webuigz/dashboard";
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
          this.router.navigate(['/login']);
          // window.location.href = "/login";
      }
    });

    // // console.log(this.username);
    // const user = {
    //   name: this.name,
    //   department: this.department
    // }
    // // data is what we store after sending this request
    // this.authService.authenticateUser(user).subscribe(data => {
    //   // console.log(data);
    //   if (data.success) {
    //     // console.log(data);
    //     this.authService.storeUserData(data.token, data.user);
    //     this.flashMessage.show('You are now logged in', {
    //       cssClass: 'alert-success',
    //       timeout: 5000});
    //       // this.router.navigate(['/dashboard']);
    //       window.location.href = "/dashboard";
    //   } else {
    //     this.flashMessage.show(data.msg, {
    //       cssClass: 'alert-danger',
    //       timeout: 5000});
    //       this.router.navigate(['/login']);
    //       // window.location.href = "/login";
    //   }
    // });
  }
}