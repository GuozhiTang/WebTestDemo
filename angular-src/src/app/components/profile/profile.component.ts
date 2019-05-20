import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: String;
  departmemt: String;
  user: {
    name: String;
    department: String;
  };

  constructor(
    private authService:AuthService,
  ) { }

  // Initialize the user
  ngOnInit() {
    // get login information about the current user in local storage.
    this.authService.getProfile().subscribe(profile => {
      // console.log(profile.user);
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
