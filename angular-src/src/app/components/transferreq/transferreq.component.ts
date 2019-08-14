import { Component, OnInit } from '@angular/core';
import { Operator } from '../../../models/Operator';
import { Department } from '../../../models/Department';
import { Role } from '../../../models/Role';
import { AuthService } from '../../services/auth.service';
import { RemotereqService } from '../../services/remotereq.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabwareSpec } from 'src/models/LabwareSpec';

@Component({
  selector: 'app-transferreq',
  templateUrl: './transferreq.component.html',
  styleUrls: ['./transferreq.component.css']
})
export class TransferreqComponent implements OnInit {
  operator: Operator;
  department: Department;
  departments: Department[];
  role: Role;
  roles: Role[];
  labwareSpec: LabwareSpec;
  labwareSpecs: LabwareSpec[]
  newReqID: String;

  constructor(
    private flashMessage: FlashMessagesService,
    public authService: AuthService,
    private remoteService: RemotereqService,
    private modalService: NgbModal,
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

    var roles = [];
    var data = this.remoteService.getCoreDaoReqData('Role', ['id'], 'fireplex.data.backend.core', true);
    this.remoteService.retrievalData(data).subscribe(res => {
      // console.log(res.results);
      for (var i = 0; i < res.results.length; i++) {
        roles.push(res.results[i]);
      }
      this.roles = roles;
    });

    var labwareSpecs = [];
    var data = this.remoteService.getCoreDaoReqData('LabwareSpec', ['id'], 'fireplex.data.backend.core', true);
    this.remoteService.retrievalData(data).subscribe(res => {
      // console.log(res.results);
      for (var i = 0; i < res.results.length; i++) {
        labwareSpecs.push(res.results[i]);
      }
      this.labwareSpecs = labwareSpecs;
    });
  }

  ngOnInit() {
  }

  onSubmitTarget() {
    var parentOptions = {
      roleName: this.role.role,
      labwareSpec: this.labwareSpec.name,
      units: "uL",
      value: 1,
      ordNum: 0,
      reqElemSpecName: "Labware Req Elem"
    }
    console.log(parentOptions);
  }

  onCreateReq(content) {
    var parentOptions = {
      roleName: this.role.role,
      labwareSpec: this.labwareSpec.name,
      units: "uL",
      value: 1,
      ordNum: 0,
      reqElemSpecName: "Labware Req Elem"
    }
    // console.log(parentOptions);

    var subReqOptions = [];
    const subReqData = {
      roleName: "Antibody Matrix Tube",
      labwareSpec: "0.5mL Matrix Tube",
      value: 1,
      units: "uL",
      ordNum: 0,
      reqElemSpecName: "Labware Req Elem"
    }
    subReqOptions.push(subReqData);

    var generateReq = {
      request: "generateRequest",
      deptSpecId: this.department.id,
      employeeId: this.operator.id,
      opSpecName: "Transfer Request",
      parentOptions: parentOptions,
      subReqOptions: {"subReqOptionsList": subReqOptions}
    }
    // console.log(generateReq);

    // this.remoteService.remotePostReq(generateReq).subscribe(res => {
    //   console.log(res);
    //   // if (res) {
    //   //   this.newReqID = res.requestId;
    //   //   this.modalService.open(content, { size:'lg', backdrop: 'static', keyboard: false});
    //   // } else {
    //   //   this.flashMessage.show('There exists some errors! Please re-check!');
    //   // }
    // });
  }

  /**
   * Method overridden to set the close functionality of the modal
   * If it succeed, then after close the webpage should be reloaded.
   */
  closeModal() {
    this.modalService.dismissAll();
    window.location.reload();
  }
}
