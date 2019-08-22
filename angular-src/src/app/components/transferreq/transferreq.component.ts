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
  username: any;
  parentOptions: Object;
  SourceAmount: number;
  num: number = 1;
  sourceList: any = [{
    ordNum: this.num,
    role: Role,
    labwareSpec: LabwareSpec
  }];
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

    // Get all the role types remotely
    var roles = [];
    var data = this.remoteService.getCoreDaoReqData('Role', ['id'], 'fireplex.data.backend.core', true);
    this.remoteService.retrievalData(data).subscribe(res => {
      // console.log(res.results);
      for (var i = 0; i < res.results.length; i++) {
        roles.push(res.results[i]);
      }
      this.roles = roles;
    });

    // Get all the labwareSpec types remotely
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

  /**
   * Method to submit the target information for transfer request as the parent option
   */
  onSubmitTarget() {
    var parentOptions = {
      roleName: this.role.role,
      labwareSpec: this.labwareSpec.name,
      units: "uL",
      value: 1,
      ordNum: 0,
      reqElemSpecName: "Labware Req Elem"
    }
    this.parentOptions = parentOptions;
    console.log(this.parentOptions);
  }

  /**
   * Method to get all the selected source information for transfer request 
   * and generate the transfer request according to source and target data
   * @param content content area for successful result modal
   */
  onCreateReq(content) {
    // console.log(this.list);
    var subReqOptions = [];
    for (var i = 0; i < this.sourceList.length; i++) {
      const subReqData = {
        roleName: this.sourceList[i].role.role,
        labwareSpec: this.sourceList[i].labwareSpec.name,
        value: 1,
        units: "uL",
        ordNum: i,
        reqElemSpecName: "Labware Req Elem"
      }
      subReqOptions.push(subReqData);
    }
    // console.log(subReqOptions);

    var generateReq = {
      request: "generateRequest",
      deptSpecId: this.department.id,
      employeeId: this.operator.id,
      opSpecName: "Transfer Request",
      parentOptions: this.parentOptions,
      subReqOptions: {"subReqOptionsList": subReqOptions}
    }
    console.log(generateReq);

    this.remoteService.remotePostReq(generateReq).subscribe(res => {
      // console.log(res);
      if (res) {
        this.newReqID = res.requestId;
        this.modalService.open(content, { size:'lg', backdrop: 'static', keyboard: false});
      } else {
        this.flashMessage.show('There exists some errors! Please re-check!');
      }
    });
  }

  /**
   * Method to get the exact amount of items in source list and do the loop to call addSource()
   */
  onGetSourceAmount() {
    for (var i = 1; i < this.SourceAmount; i++) {
      this.addSource();
    }
  }

  /**
   * Method to add a new source object to the sourcelist
   */
  addSource() {
    console.log("Add new source!");
    this.num += 1;
    // this.list.push(this.id);
    var data = {
      ordNum: this.num,
      role: Role,
      labwareSpec: LabwareSpec
    }
    this.sourceList.push(data);
  }

  /**
   * Method to delete a source onject from the sourcelist
   * @param source the exact source object which need to be deleted
   */
  deleteSource(source) {
    // console.log(source);
    var index = this.sourceList.indexOf(source);
    console.log('delete index ' + index);
    this.sourceList.splice(index, 1);
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