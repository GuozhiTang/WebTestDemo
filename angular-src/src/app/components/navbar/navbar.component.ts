import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: String;
  departmemt: String;
  user: {
    name: String;
    department: String;
  };

  constructor(
    public authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit() {
    // this.authService.getProfile().subscribe(profile => {
    //   // console.log(profile.user);
    //   this.user = profile.user;
    // },
    // err => {
    //   console.log(err);
    //   return false;
    // });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    // this.router.navigate(['/login']);
    window.location.href = "/login";
    return false;
  }
}
