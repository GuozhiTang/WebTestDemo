import { Component, OnInit } from '@angular/core';
import { WorkorderService } from '../../services/workorder.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-generateworkorder',
  templateUrl: './generateworkorder.component.html',
  styleUrls: ['./generateworkorder.component.css']
})
export class GenerateworkorderComponent implements OnInit {
  deptSpecId: number;
  employeeId: number;
  opSpecNames: String[] = ['Assay Request', 'Code Dilution Request', 'Code Mix Request', 'Particle Coding Request', 'Transfer Request'];
  opSpecName: String;
  assayCodeTypes: String[];
  assayCodeType: String;
  assayCodeId1s: number[];
  assayCodeId2s: number[];
  UC2Cy31A: number = 40.575;
  UC2NF: number = 26.175;
  UC3Cy31A: number = 39.5;
  UC3NF: number = 34.1;
  Volume: number = 2;
  Franction: number[] = [1, 0.730902563, 0.531633462, 0.382791365, 0.270895615, 0.186366526, 0.122276884, 0.073549421, 0.036423685, 0.008091924,
                          1, 0.506270091, 0.26124365, 0.132317345, 0.062389175, 0.023835757, 0.002388402]
  UC2Cy31AArray: number[];
  UC2NFArray: number[];
  tableCode1: any[];
  tableCode2: any[];

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
    const valueArray = this.UC2Cy31AArray;
    // Add Code1 IDs to the subReqOptions
    this.assayCodeId1s.forEach(function(val, index) {
      // console.log(index, val);
      const subReqData = {
        value: valueArray[index],
        units: "UC1-Bodipy",
        ordNum: index,
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
        value: valueArray[index + 10],
        units: "",
        ordNum: index + 10,
        assayCodeId: val,
        codeReqElemSpecName: localAssayCodeType,
        roleName: "HB",
        reqElemSpecName: localAssayCodeType,
      }
      subReqOptions.push(subReqData);
    });
    // console.log(subReqOptions);

    // Define the json set to sent in order to generate the request
    const generate = {
      request: "generateRequest",
      deptSpecId: 2865407,
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

  /**
   * Do the calculation according to four inputs from user
   * Then give a display for the calculated data
   * Creation of request is allowed only after this calculation
   */
  onCalculate() {
    var C4 = this.UC2Cy31A * 1000 / 4023.9;
    var D4 = this.UC2NF * 1000 / 3370.2;
    var E4 = this.UC3Cy31A * 1000 / 4103.9;
    var F4 = this.UC3NF * 1000 / 3450.2;
    var Array = [];
    var NFArray = [];
    // Get the array of UC2-Cy3+1A and UC3-Cy3+1A
    for (var i = 0; i < this.Franction.length; i++) {
      if (i <= 9) {
        Array.push((this.Franction[i]*1000*this.Volume*D4/(C4+this.Franction[i]*D4-this.Franction[i]*C4)).toFixed(1));
      } else {
        Array.push((this.Franction[i]*1000*this.Volume*F4/(E4+this.Franction[i]*F4-this.Franction[i]*E4)).toFixed(1));
      }
    }
    this.UC2Cy31AArray = Array;
    // console.log(this.UC2Cy31AArray);

    // Get the array of UC2-NF and UC3-NF
    for (var j = 0; j < Array.length; j++) {
      if (i <= 9) {
        NFArray.push(Array[0] - Array[j]);
      } else {
        NFArray.push(Array[10] - Array[j]);
      }
    }
    this.UC2NFArray = NFArray;
    // console.log(this.UC2NFArray);

    // To combine the data which should be displayed in a json Array
    var tableData1 = [];
    var tableData2 = [];
    var Far = this.Franction;

    for (var i = 0; i <= 9; i++) {
      var Data1 = {
        code1Num: i + 1,
        UC2NF: NFArray[i],
        UC2Cy31A: Array[i],
        Franction: Far[i]
      } 
      tableData1.push(Data1);
    }
    this.tableCode1 = tableData1;

    for (var j = 10; j < Array.length; j++) {
      var Data2 = {
        code1Num: j - 9,
        UC3NF: NFArray[j],
        UC3Cy31A: Array[j],
        Franction: Far[j]
      } 
      tableData2.push(Data2);
    }
    this.tableCode2 = tableData2;
  }
}