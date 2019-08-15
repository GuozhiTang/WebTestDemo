import { Component, OnInit } from '@angular/core';
import { Operator } from '../../../models/Operator';
import { Department } from '../../../models/Department';
import { AuthService } from '../../services/auth.service';
import { RemotereqService } from '../../services/remotereq.service';
import { Instrument } from '../../../models/Instrument';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-instrumentreq',
  templateUrl: './instrumentreq.component.html',
  styleUrls: ['./instrumentreq.component.css']
})
export class InstrumentreqComponent implements OnInit {
  operator: Operator;
  department: Department;
  departments: Department[];
  instrument: Instrument;
  instruments: Instrument[];
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

    // Get all the instruments remotely
    var instruments = [];
    var data = this.remoteService.getCoreDaoReqData('Instrument', ['id'], 'fireplex.data.backend.core', true);
    this.remoteService.retrievalData(data).subscribe(res => {
      // console.log(res.results);
      for (var i = 0; i < res.results.length; i++) {
        instruments.push(res.results[i]);
      }
      this.instruments = instruments;
      // console.log(this.instruments);
    });
  }

  ngOnInit() {
  }

  /**
   * Method to get the information for parentOptions 
   * and generate the transfer request according to that
   * @param content content area for successful result modal
   */
  onCreateReq(content) {
    // Define the parentOptions
    var parentOptions = {
      instrumentId: this.instrument.id,
      units: "",
      value: 1,
      ordNum: 0,
      reqElemSpecName: "Instrument Req Elem"
    }

    var generateReq = {
      request: "generateRequest",
      deptSpecId: this.department.id,
      employeeId: this.operator.id,
      opSpecName: "Instrument Request",
      parentOptions: parentOptions,
      subReqOptions: ""
    }
    // console.log(generateReq);

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
   * Method overridden to set the close functionality of the modal
   * If it succeed, then after close the webpage should be reloaded.
   */
  closeModal() {
    this.modalService.dismissAll();
    window.location.reload();
  }
}