import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: String;
  departmemt: String;
  user: {
    name: String;
    department: String;
  };

  constructor(
    public authService:AuthService,
    ) {
      this.authService.getProfile().subscribe(profile => {
        // console.log(profile.user);
        this.user = profile.user;
        // console.log(this.user);
      }
    )}

  ngOnInit() {
  }

}
