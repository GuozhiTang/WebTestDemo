import { Component, OnInit } from '@angular/core';
import { WorkorderService } from '../../services/workorder.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-generateworkorder',
  templateUrl: './generateworkorder.component.html',
  styleUrls: ['./generateworkorder.component.css']
})
export class GenerateworkorderComponent implements OnInit {
  deptSpecId: Number;
  employeeId: Number;
  opSpecNames: String[] = ['Assay Request', 'Code Dilution Request', 'Code Mix Request', 'Particle Coding Request', 'Transfer Request'];
  opSpecName: String;
  assayCodeTypes: String[];
  assayCodeType: String;
  assayCodeId1s: Number[];
  assayCodeId2s: Number[];
  UC2Cy31A: Number;
  UC2NF: Number;
  UC3Cy31A: Number;
  UC3NF: Number;

  constructor(
    private workorderService: WorkorderService,
    private flashMessage:FlashMessagesService,
  ) {
    // Get the set of Code1 IDs
    var codeId1s = [];
    this.workorderService.getSingleCode1().subscribe(res => {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        codeId1s.unshift(res[i].id);
      }
      this.assayCodeId1s = codeId1s;
    });
    // Get the set of Code2 IDs
    var codeId2s = [];
    this.workorderService.getSingleCode2().subscribe(res => {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        codeId2s.unshift(res[i].id);
      }
      this.assayCodeId2s = codeId2s;
    });
  }

  ngOnInit() {
  }

  /**
   * Get Assay Code Types according to selected request type
   * @param reqType: Input selected request type
   */
  getAssayCodeType(reqType) {
    if (reqType == 'Assay Request') {
      this.assayCodeTypes = ['Assay Req Elem'];
    } else if (reqType == 'Particle Coding Request') {
      this.assayCodeTypes = ['Particle Req Elem'];
    } else if (reqType == 'Code Mix Request' || reqType == 'Code Dilution Request') {
      this.assayCodeTypes = ['CEA Code Req Elem', 'miRNA Code Req Elem'];
    }
  }

  /**
   * A submit functionality to generate a request
   */
  onCreateReq() {
    // console.log(this.assayCodeId1s);
    // console.log(this.assayCodeId2s);
    const roleName = (this.opSpecName == 'Code Mix Request') ? 'Code Mixes' : 'Code Dils';
    const localAssayCodeType = this.assayCodeType;
    // Define the parentOptions
    var parentOptions = {
      roleName: roleName,
      units: "",
      value: 1,
      ordNum: 0,
      reqElemSpecName: this.assayCodeType,
    }

    // Define and get the subReqOptions
    var subReqOptions = [];
    // Add Code1 IDs to the subReqOptions
    this.assayCodeId1s.forEach(function(val, index) {
      // console.log(index, val);
      const subReqData = {
        value: 0,
        units: "",
        ordNum: index + 1,
        assayCodeId: val,
        codeReqElemSpecName: localAssayCodeType,
        roleName: roleName,
        reqElemSpecName: localAssayCodeType,
      }
      subReqOptions.push(subReqData);
    });

    // Add Code2 IDs to the subReqOptions
    this.assayCodeId2s.forEach(function(val, index) {
      var subReqData = {
        value: 0,
        units: "",
        ordNum: index + 11,
        assayCodeId: val,
        codeReqElemSpecName: localAssayCodeType,
        roleName: roleName,
        reqElemSpecName: localAssayCodeType,
      }
      subReqOptions.push(subReqData);
    });
    // console.log(subReqOptions);

    // Define the json set to sent in order to generate the request
    const generate = {
      request: "generateRequest",
      deptSpecId: 2864165,
      employeeId: 1587869,
      opSpecName: this.opSpecName,
      parentOptions: parentOptions,
      subReqOptions: {"subReqOptionsList": subReqOptions},
    }
    // console.log(generate);

    this.workorderService.generateRequest(generate).subscribe(res => {
      // console.log(res);
      if (res) {
        this.flashMessage.show('Create Work-order Successfully!', {cssClass: 'alert-success', timeout: 5000});
        window.location.reload();
      } else {
        this.flashMessage.show('Error Exists! Check again!');
      }
    });
  }
}
