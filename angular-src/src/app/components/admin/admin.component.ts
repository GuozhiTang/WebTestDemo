import { Component, OnInit } from '@angular/core';
import { RemotereqService } from '../../services/remotereq.service';
import { Operator } from '../../../models/Operator';
import { OperatorDept } from '../../../models/OperatorDept';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  remoteoperatordepts: OperatorDept[];
  remoteoperators: Operator[];
  operators: String[];
  departments: String[];
  operator: String;
  department: String;
  password: String;
  hideEntry: Boolean;

  constructor(
    private remoteService: RemotereqService,
    private flashMessage:FlashMessagesService,
  ) {
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