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
  department: String;
  departments: String[] = ['Manufacturing Dept', 'HT Assay Dept'];

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    // console.log(this.username);
    const user = {
      name: this.name,
      department: this.department
    }

    // data is what we store after sending this request
    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if (data.success) {
        // console.log(data);
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});

          // window.location.href = "/dashboard";
          this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
          this.router.navigate(['login']);
          // window.location.href = "/dashboard";
      }
    });
  }
}
