import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReqStatus } from '../../../models/ReqStatus';
import { StatusList } from '../../../models/StatusList';
import { ViewEncapsulation } from '@angular/core';
import { RemotereqService } from '../../services/remotereq.service';
import { Operator } from '../../../models/Operator';
import { Department } from '../../../models/Department';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .modal-lg {
    max-width: 1200px !important;
  }
`]
})
export class ProcessComponent implements OnInit {
  operator: Operator;
  department: Department;
  departments: Department[];
  instruments: String[];
  workorders: String[];
  protocols: String[];
  remoteprocess: any;
  // user: {
  //   name: String;
  //   department: String;
  // };
  type: String;
  Requests: any;
  requestId: Number;
  reqRes: any;
  closeResult: string;
  protocol: String;
  instrument: String;
  // statusRes: any;
  statusRes: ReqStatus[];
  typeRes: StatusList[];
  operatorName: String;
  comments: String;
  opSpecId: Number;
  newtable: any;
  newstatus: ReqStatus[];
  showUpdate: any = undefined;

  constructor(
    public authService:AuthService,
    private flashMessage: FlashMessagesService,
    private modalService: NgbModal,
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

      // get status types here
      this.remoteService.retrievalData('fpReqStatusList').subscribe(types => {
        this.typeRes = types;
        // console.log(this.typeRes);
      });

      // // get user information as well as instruments here
      // this.authService.getProfile().subscribe(profile => {
      //   // console.log(profile.user.department);
      //   // console.log(typeof(profile.user.department));
      //   this.user = profile.user;
      //   if (this.user.department == "Manufacturing Dept") {
      //     // console.log("successful!");
      //     this.instruments = ['Robot 2', 'Robot 3', 'Stamp 1', 'Nanodrop', 'Manual'];
      //   } else if (this.user.department == "HT Assay Dept") {
      //     // console.log("Failed!");
      //     this.instruments = ['Hamilton RBT1', 'Manual'];
      //   }
      // });
    }

  ngOnInit() {
  }

  /**
   * Get Instrument according to selected department
   * @param department input selected department
   */
  getInstruments(department) {
    const data = {
      request: "getInstrumentsByDept",
      deptSpecId: department.id
    }
    var instruments = [];
    this.remoteService.remotePostReq(data).subscribe(res => {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        instruments.push(res[i].instrument_id.short);
      }
      this.instruments = instruments;
      // console.log(this.instruments);
    });
  }

  /**
   * Get work-orders according to selected instrument
   * @param instrument: input selected instrument
   */
  getWorkorders(instrument) {
    if (instrument) {
      var workorders = [];
      var data = this.remoteService.getCoreDaoReqData('Spec', ['id'], 'fireplex.data.backend.core', true);
      this.remoteService.retrievalData(data).subscribe(res => {
        // console.log(res.results);
        var searchAs = /.*request$/gi;
        for (var i = 0; i < res.results.length; i++) {
          // console.log(res.results[i].name.search(searchAs));
          if (res.results[i].name.search(searchAs) != -1) {
            workorders.push(res.results[i].name);
          }
        }
        this.workorders = workorders;
        // console.log(this.workorders);
      });
    }
  }

  /**
   * Get protocols according to selected work-orders
   * @param type: input selected work-order type
   */
  getProtocols(type) {
    if (type == 'Immunoassay Request' && this.department.name == 'HT Assay Dept') {
      this.protocols = ['HT Immunoassay Conjugation V1-2-With-Tips Short'];
    } else if (type == 'Particle Coding Request') {
      // this.protocols = ['HT Immunoassay Conjugation V1-2-With-Tips Short'];
    }
  }

  /**
   * Get requests (work-orders) by request type
   */
  onGetRequests() {
    const getRequests = {
      request: "fpGetReqDT",
      dept: this.department.name,
      reqType: this.type
    }
    // console.log(getReq);
    this.remoteService.remotePostReq(getRequests).subscribe(req => {
      this.Requests = req;
      // console.log(this.Requests);
    });
  }

  /**
   * Get request items by request ID
   * @param reqId: request Id
   */
  onShowRequest(reqId) {
    const getByReqId = {
      request: "fpGetReqDetails",
      reqId: reqId
    }
    // console.log('Successful!');
    this.requestId = reqId;
    this.statusRes = undefined;
    this.remoteService.remotePostReq(getByReqId).subscribe(reqres => {
      this.reqRes = reqres;
    });
  }

  /**
   * open the modal for setup the request
   * @param content: content area for request setup modal
   */
  openModalforRequest(content) {
    this.modalService.open(content, { size:'lg', backdrop: 'static', keyboard: false});
  }

  /**
   * Show status according to the request Id
   * @param reqId: request Id
   */
  onShowStatus(reqId) {
    const showStatus = {
      request: "fpStatusForReq",
      requestId: reqId
    }
    this.requestId = reqId;
    this.reqRes = undefined;
    this.remoteService.remotePostReq(showStatus).subscribe(status => {
      // console.log("status"+status);
      this.statusRes = status;
      // console.log(this.statusRes);
      // this.operatorName = this.statusRes.status_op.requestor_id.name;
    });
  }

  /**
   * Open the modal for update the status
   * @param content2: content area for status update modal
   */
  openModalforStatus(content2) {
    this.modalService.open(content2, { backdrop: 'static', keyboard: false});
  }

  // innerDiv() {
  //   document.getElementById("statusTable").innerHTML = 
  //   "<table class='table-striped table-bordered table-dark'  style='text-align: center'>" + 
  //   "<tr>" +
  //     "<th style='padding-left: 2px; padding-right: 2px'>Status Id</th>" +
  //     "<th style='padding-left: 2px; padding-right: 2px'>Spec Name</th>" +
  //     "<th style='padding-left: 2px; padding-right: 2px'>Requestor</th>" +
  //     "<th style='padding-left: 2px; padding-right: 2px'>Comments</th>" +
  //     "<th style='padding-left: 2px; padding-right: 2px'>Requested</th>" +
  //   "</tr>" + 
  //   "<tr *ngFor='let status of statusRes'>" +
  //     "<td style='padding-left: 2px; padding-right: 2px'>{{status.status_op.id}}</td>" +
  //     "<td style='padding-left: 2px; padding-right: 2px'>{{status.status_op.spec_id.name}}</td>" +
  //     "<td style='padding-left: 2px; padding-right: 2px'>{{status.status_op.requestor_id.name}}</td>" +
  //     "<td style='padding-left: 2px; padding-right: 2px'>{{status.status_op.comment}}</td>" +
  //     "<td style='padding-left: 2px; padding-right: 2px'>{{status.status_op.requested}}</td>" +
  //   "</tr>" +
  // "</table>"
  // }

  // showUpdates() {
  //   this.showUpdate = ! this.showUpdate;
  // }

  /**
   * Add new status for updates
   */
  onAddStatus() {
    const addStatus = {
      request: "fpAddReqStatus",
      requestId: this.requestId,
      operatorName: this.operator.name,
      opSpecId: this.opSpecId,
      statusComment: this.comments
    }
    // console.log(this.requestId);
    // console.log(this.opSpecId);
    // console.log(this.comments);
    this.remoteService.remotePostReq(addStatus).subscribe(newStatus => {
      // console.log(newStatus);
      this.newstatus = newStatus;
      // console.log(this.newstatus[0]);
      const newTable = {
        requested: this.newstatus[0].requested,
        status_op: {
          comment: this.newstatus[0].status_op.comment,
          requested: this.newstatus[0].status_op.requested,
          moduleName: this.newstatus[0].status_op.moduleName,
          requestor_id: {
            moduleName: this.newstatus[0].status_op.requestor_id.moduleName,
            name: this.newstatus[0].status_op.requestor_id.name,
            admin: this.newstatus[0].status_op.requestor_id.admin,
            className: this.newstatus[0].status_op.requestor_id.className,
            active: this.newstatus[0].status_op.requestor_id.active,
            manufacturing: this.newstatus[0].status_op.requestor_id.manufacturing,
            id: this.newstatus[0].status_op.requestor_id.id,
          },
          className: this.newstatus[0].status_op.className,
          spec_id: {
            moduleName: this.newstatus[0].status_op.spec_id.moduleName,
            description: this.newstatus[0].status_op.spec_id.description,
            approver_id: this.newstatus[0].status_op.spec_id.approver_id,
            name: this.newstatus[0].status_op.spec_id.name,
            className: this.newstatus[0].status_op.spec_id.className,
            sop_id: this.newstatus[0].status_op.spec_id.sop_id,
            id: this.newstatus[0].status_op.spec_id.id
          },
          id: this.newstatus[0].status_op.id,
        },
        requestor_id: this.newstatus[0].requestor_id,
        dept_spec: this.newstatus[0].dept_spec,
        className: this.newstatus[0].className,
        moduleName: this.newstatus[0].moduleName,
        completed_op: this.newstatus[0].completed_op
      }
      // console.log(newTable);
      this.newtable = newTable;
      this.statusRes.unshift(this.newtable);
      if (this.newtable) {
        this.flashMessage.show('Update new status successfully!', {cssClass: 'alert-success', timeout: 3000});
      }
      this.comments = undefined;
    });
  }
}