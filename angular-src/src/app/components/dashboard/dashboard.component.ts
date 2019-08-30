/*
 * @Description: The Dashboard to show some demanded details
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:15:52
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Operator } from '../../../models/Operator';
import { Department } from '../../../models/Department';
import { RemotereqService } from '../../services/remotereq.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: String;
  operator: Operator;
  departments: Department[];
  // user: {
  //   name: String;
  //   department: String;
  // };

  constructor(
    public authService:AuthService,
    private remoteService: RemotereqService,
    ) {
      // Get operator information in local database
      this.authService.getProfile().subscribe(profile => {
        // console.log(profile);
        this.operator = profile.operator;
        // console.log(this.operator);

        // Get departments according to specific operator information
        var departments = [];
        var data = this.remoteService.getCoreDaoReqData('OperatorDept', ['id'], 'fireplex.data.backend.core', true);
        this.remoteService.retrievalData(data).subscribe(res => {
          // console.log(res.results);
          for (var i = 0; i < res.results.length; i++) {
            if (res.results[i].operator_id.id == profile.operator.id) {
              // console.log(res.results[i].dept_spec);
              departments.push(res.results[i].dept_spec);
            }
          }
          this.departments = departments;
          // console.log(this.departments);
        });
      });
    }

  ngOnInit() {
  }

}