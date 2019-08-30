/*
 * @Description: The administrator page which is hidden from the UI but can be access by route and admin password
 * @Author: Guozhi Tang
 * @Date: 2019-08-06 15:01:27
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:07:42
 */
import { Component, OnInit } from '@angular/core';
import { RemotereqService } from '../../services/remotereq.service';
import { Operator } from '../../../models/Operator';
import { OperatorDept } from '../../../models/OperatorDept';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Department } from '../../../models/Department';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  remoteoperatordepts: OperatorDept[];
  remoteoperators: Operator[];
  operators: String[];
  name: String;
  operator: Operator;
  departments: Department[];
  department: String;
  password: String;
  hideEntry: Boolean;

  constructor(
    private remoteService: RemotereqService,
    private flashMessage:FlashMessagesService,
    public authService:AuthService,
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
    
    // show all operators remotely
    this.remoteService.retrievalData('getOperators').subscribe(remote => {
      this.remoteoperators = remote;
      // console.log(this.remoteoperators);
    });

    // show all deptspecs remotely
    var deptspec = this.remoteService.getCoreDaoReqData('DeptSpec', ['id'], 'fireplex.data.backend.core', 'true');
    this.remoteService.retrievalData(deptspec).subscribe(res => {
      this.departments = res.results;
      // console.log(this.departments);
    });

    // show all operatordepts remotely
    var opDept = this.remoteService.getCoreDaoReqData('OperatorDept', ['id'], 'fireplex.data.backend.core', 'true');
    this.remoteService.retrievalData(opDept).subscribe(remote => {
      this.remoteoperatordepts = remote.results;
      // console.log(this.remoteoperatordepts);
    });

  }

  ngOnInit() {
    // Initially set only display the admin login page
    this.hideEntry = false;
  }

  /**
   * Simple password authentication for accessing the admin page
   */
  onAccess() {
    // console.log(this.password);
    if (this.password == 'fpfgreen') {
      this.hideEntry = true;
    } else {
      this.flashMessage.show('Admin Password Wrong! Please try again!', {cssClass: 'alert-danger', timeout: 5000});
    }
  }

  /**
   * Method of associating specific operator with exact department
   */
  onAssociate() {}
}