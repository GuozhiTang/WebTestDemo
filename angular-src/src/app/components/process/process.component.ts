import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../../services/process.service';
// import { Process } from '../../../Instrument';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
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
  ins: String;
  type: String;
  Requests: any;
  requestId: Number;
  reqRes: any;

  constructor(
    public authService:AuthService,
    private flashMessage: FlashMessagesService,
    private processService: ProcessService) {

      // this.processService.getremoteRequests().subscribe(remoteprocess => {
      //   this.remoteprocess = remoteprocess;
      //   // console.log(this.remoteprocess);
      // });

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

  onShowRequest(reqId) {
    const ReqId = {
      request: "fpGetReqDetails",
      reqId: reqId
    }

    // console.log('Successful!');
    this.requestId = reqId;
    this.processService.getByReqId(ReqId).subscribe(reqres => {
      this.reqRes = reqres;
    });
  }
}
