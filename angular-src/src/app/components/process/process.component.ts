import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusRes } from '../../../StatusRes';
import { ViewEncapsulation } from '@angular/core';

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
  instruments: String[];
  workorders: String[];
  protocols: String[];
  remoteprocess: any;
  user: {
    name: String;
    department: String;
  };
  type: String;
  Requests: any;
  requestId: Number;
  reqRes: any;
  closeResult: string;
  protocol: String;
  instrument: String;
  // statusRes: any;
  statusRes: StatusRes[];
  typeRes: {
    moduleName: String;
    description: String;
    approber_id: Number;
    name: String;
    className: String;
    sop_id: Number;
    id: Number;
  }
  operatorName: String;
  comments: String;
  opSpecId: Number;
  newtable: any;
  newstatus: StatusRes[];
  showUpdate: any = undefined;

  constructor(
    public authService:AuthService,
    private flashMessage: FlashMessagesService,
    private processService: ProcessService,
    private modalService: NgbModal,) {
    
      // get status types here
      const info ={
        request: "fpReqStatusList"
      }
      this.processService.getStatusTypes(info).subscribe(types => {
        this.typeRes = types;
      });

      // get user information as well as instruments here
      this.authService.getProfile().subscribe(profile => {
        // console.log(profile.user.department);
        // console.log(typeof(profile.user.department));
        this.user = profile.user;
        if (this.user.department == "Manufacturing Dept") {
          // console.log("successful!");
          this.instruments = ['Robot 2', 'Robot 3', 'Stamp 1', 'Nanodrop', 'Manual'];
        } else if (this.user.department == "HT Assay Dept") {
          // console.log("Failed!");
          this.instruments = ['Hamilton RBT1', 'Manual'];
        }
      });
    }

  ngOnInit() {
  }

  /**
   * Get work-orders according to selected instruments
   * @param instrument: input selected instrument
   */
  getWorkorders(instrument) {
    if (instrument == 'Manual' && this.user.department == 'HT Assay Dept') {
      this.workorders = ['Code Mix Request', 'Code Dilution Request', 'Transfer Request', 'Cytometer Setup Kit Request', 'HCI Setup Kit Request', 'Particle Coding Request', 'Assay Request'];
      // console.log('successful!');
    } else if (instrument == 'Hamilton RBT1') {
      this.workorders = ['Code Mix Request', 'Code Dilution Request', 'Transfer Request', 'Cytometer Setup Kit Request', 'HCI Setup Kit Request', 'Particle Coding Request', 'Assay Request'];
    } else if (instrument == 'Robot 2' || instrument == 'Robot 3' || instrument == 'Stamp 1' || instrument == 'Nanodrop') {
      this.workorders = ['Code Mix Request', 'Code Dilution Request', 'Transfer Request', 'Cytometer Setup Kit Request', 'HCI Setup Kit Request', 'Particle Coding Request', 'Assay Request'];
    } else if (instrument == 'Manual' && this.user.department == 'Manufacturing Dept') {
      this.workorders = ['Code Mix Request', 'Code Dilution Request', 'Transfer Request', 'Cytometer Setup Kit Request', 'HCI Setup Kit Request', 'Particle Coding Request', 'Assay Request'];
    }
  }

  /**
   * Get protocols according to selected work-orders
   * @param type: input selected work-order type
   */
  getProtocols(type) {
    if (type == 'Assay Request' && this.user.department == 'HT Assay Dept') {
      this.protocols = ['HT Immunoassay Conjugation V1-2-With-Tips Short'];
    } else if (type == 'Particle Coding Request') {
      // this.protocols = ['HT Immunoassay Conjugation V1-2-With-Tips Short'];
    }
  }

  /**
   * Get requests (work-orders) by request type
   */
  getRequests() {
    const getReq = {
      request: "fpGetReqDT",
      dept: this.user.department,
      reqType: this.type
    }
    // console.log(getReq);
    this.processService.getRequests(getReq).subscribe(req => {
      this.Requests = req;
      // console.log(this.Requests);
    });
  }

  /**
   * Get request items by request ID
   * @param reqId: request Id
   */
  onShowRequest(reqId) {
    const ReqId = {
      request: "fpGetReqDetails",
      reqId: reqId
    }
    // console.log('Successful!');
    this.requestId = reqId;
    this.statusRes = undefined;
    this.processService.getByReqId(ReqId).subscribe(reqres => {
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
    const showComment = {
      request: "fpStatusForReq",
      requestId: reqId
    }
    this.requestId = reqId;
    this.reqRes = undefined;
    this.processService.showStatus(showComment).subscribe(status => {
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
  addStatus() {
    const add = {
      request: "fpAddReqStatus",
      requestId: this.requestId,
      operatorName: this.user.name,
      opSpecId: this.opSpecId,
      statusComment: this.comments
    }
    // console.log(this.requestId);
    // console.log(this.opSpecId);
    // console.log(this.comments);
    this.processService.addStatus(add).subscribe(newStatus => {
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
