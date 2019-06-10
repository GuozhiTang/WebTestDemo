import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: String;
  departmemt: String;
  user: {
    name: String;
    department: String;
  };

  constructor(
    public authService:AuthService,
    private flashMessage:FlashMessagesService,
    ) {
      this.authService.getProfile().subscribe(profile => {
        // console.log(profile);
        this.user = profile.user;
        // console.log(this.user);
      }
    )}

  ngOnInit() {
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