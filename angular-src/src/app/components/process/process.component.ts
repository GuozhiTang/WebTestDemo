import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../../services/process.service';
// import { Process } from '../../../Instrument';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabwareSpec } from '../../../LabwareSpec';
import { LabwarespecsService } from '../../services/labwarespecs.service';
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
  statusRes: {
    requested: String;
    status_op: {
      comment: String;
      requested: String;
      moduleName: String;
      requestor_id: {
        moduleName: String;
        name: String;
        admin: Boolean;
        className: String;
        active: Boolean;
        manufacturing: Boolean;
        id: Number;
      }
      className: String;
      spec_id: Object;
      id: Number;
    }
    requestor_id: Object;
    dept_spec: Object;
    className: String;
    moduleNAme: String;
    completed_op: Object;
  }
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

  constructor(
    public authService:AuthService,
    private flashMessage: FlashMessagesService,
    private processService: ProcessService,
    private modalService: NgbModal,) {
    
      const info ={
        request: "fpReqStatusList"
      }
      this.processService.getStatusTypes(info).subscribe(types => {
        this.typeRes = types;
      });

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

  getTypes(instrument) {
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

  getProtocols(type) {
    if (type == 'Assay Request' && this.user.department == 'HT Assay Dept') {
      this.protocols = ['HT Immunoassay Conjugation V1-2-With-Tips Short'];
    } else if (type == 'Particle Coding Request') {
      // this.protocols = ['HT Immunoassay Conjugation V1-2-With-Tips Short'];
    }
  }

  // get requests by request type
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

  // get request items by request ID
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

  // open the modal for setup the request
  openModalforRequest(content) {
    this.modalService.open(content, { size:'lg', backdrop: 'static', keyboard: false});
  }

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

  // open the modal for update the status
  openModalforStatus(content) {
    this.modalService.open(content, { size:'lg', backdrop: 'static', keyboard: false});
  }

  addStatus() {
    const add = {
      request: "fpAddReqStatus",
      requestId: this.requestId,
      operatorName: "Felix Green",
      opSpecId: this.opSpecId,
      statusComment: this.comments
    }

    this.processService.addStatus(add).subscribe(newStatus => {
      console.log(newStatus);
    });
  }

  showSth() {
    console.log(this.requestId);
    console.log(this.opSpecId);
  }
}
