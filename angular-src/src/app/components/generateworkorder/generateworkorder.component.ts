import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';

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
  UC21A: number = 41.2;
  UC2NF: number = 30.3;
  UC31A: number = 41.478;
  UC3NF: number = 30.675;
  Volume: number = 500;
  H9: number = this.UC21A * 1000 / 4023.9;
  I9: number = this.UC2NF * 1000 / 3370.2;
  J9: number = this.UC31A * 1000 / 4103.9;
  K9: number = this.UC3NF * 1000 / 3450.2;
  Maxlin1: number;
  Maxlin2: number;
  Minlin1: number;
  Minlin2: number;
  spacing1: number;
  spacing2: number;
  MAX1: number;
  MAX2: number;
  MIN1: number;
  MIN2: number;
  UC2: number;
  UC3: number;
  Grid: number[];
  percentages: number[];
  tableCode1: number[];
  tableCode2: number[];
  check10x7: Boolean = false;
  check4x4: Boolean = true;
  check6x6: Boolean = true; 

  constructor(
    private flashMessage:FlashMessagesService,
    private remoteService: RemotereqService,
  ) {
    // Get the set of Code1 IDs
    var codeId1s = [];
    this.remoteService.retrievalData('fpGetSingleCode1').subscribe(res => {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        codeId1s.unshift(res[i].id);
      }
      this.assayCodeId1s = codeId1s;
      // console.log(this.assayCodeId1s);
    });

    // Get the set of Code2 IDs
    var codeId2s = [];
    this.remoteService.retrievalData('fpGetSingleCode2').subscribe(res => {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        codeId2s.unshift(res[i].id);
      }
      this.assayCodeId2s = codeId2s;
      // console.log(this.assayCodeId2s);
    });
  }

  ngOnInit() {
  }

  /**
   * Method to get the code map type according to user's selection
   * @param codeMap Selection of the type of Code Map
   */
  getCodeMapType(codeMap) {
    if (codeMap == '4x4') {
      console.log('Code Map Type is 4x4!');
      this.check4x4 = true;
      this.check6x6 = false;
      this.check10x7 = false;
    } else if (codeMap == '6x6') {
      console.log('Code Map Type is 6x6!');
      this.check4x4 = false;
      this.check6x6 = true;
      this.check10x7 = false;
    } else if (codeMap == '10x7'){
      console.log('Code Map Type is 10x7!')
      this.check4x4 = false;
      this.check6x6 = false;
      this.check10x7 = true;
    } else {
      this.check4x4 = false;
      this.check6x6 = false;
      this.check10x7 = false;
    }
  }

  /**
   * Get Assay Code Types according to selected request type
   * @param reqType Selection of request type
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
   * Method to pass in the parameters based on different code map types
   * Then call the calculation method according to the code map type
   */
  onCalculate() {
    if (this.check4x4) {
      this.getParameters([1,2,3,4,1,2,3,4], 1.47287763166735, 2.67968245856451, 0.216645663311592, 0.384960940481029,
                        3, 3, 1.47288, 2.67968, 0.11769, 0.1855, 1.1978575844656, 1.38027132448778);
      this.calculate(4, 4);
    } else if (this.check6x6) {
      this.getParameters([1,2,3,4,5,6,1,2,3,4,5,6], 1.47287763166735, 2.67968245856451, 0.216645663311592, 0.384960940481029,
                        5, 5, 1.47288, 2.67968, 0.11769, 0.1855, 1.1978575844656, 1.38027132448778);
      this.calculate(6, 6);
    } else if (this.check10x7) {
      this.getParameters([1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7], 0.50, 1.45, 0.046, 0.046, 9, 6,
                          0.5, 1.45, 0.042, 0.042, 1.26977603033476, 1.40518121409196);
      this.calculate(10, 7);
    }
  }

  /**
   * Method to get all values of necessary parameters according to passed in values 
   * @param Grid Array-type Grid Loc values for combination of code1 and code2
   * @param Maxlin1 Max(lin) value for code1
   * @param Maxlin2 Max(lin) value for code2
   * @param Minlin1 Min(lin) value for code1
   * @param Minlin2 Min(lin) value for code2
   * @param spacing1 The denominator of spacing1 calculation
   * @param spacing2 The denominator of spacing2 calculation
   * @param MAX1 MAX value for code1
   * @param MAX2 MAX value for code2
   * @param MIN1 MIN value for code1
   * @param MIN2 MIN value for code2
   * @param UC2 UC2 value for specific code map type
   * @param UC3 UC3 value for specific code map type
   */
  getParameters(Grid, Maxlin1, Maxlin2, Minlin1, Minlin2, spacing1, spacing2, MAX1, MAX2, MIN1, MIN2, UC2, UC3) {
    this.Grid = Grid;
    this.Maxlin1 = Maxlin1;
    this.Maxlin2 = Maxlin2;
    this.Minlin1 = Minlin1;
    this.Minlin2 = Minlin2;
    this.spacing1 = (Math.log10(this.Maxlin1) - Math.log10(this.Minlin1)) / spacing1;
    this.spacing2 = (Math.log10(this.Maxlin2) - Math.log10(this.Minlin2)) / spacing2;
    this.MAX1 = MAX1;
    this.MAX2 = MAX2;
    this.MIN1 = MIN1;
    this.MIN2 = MIN2;
    this.UC2 = UC2;
    this.UC3 = UC3;
  }

  /**
   * The main method for calculation based on specific code map type
   * @param code1 numbers of code1
   * @param code2 numbers of code2
   */
  calculate(code1: number, code2: number) {
    var percent = ADJ / (1 + ADJ);
    var ADJ;
    var FNF;
    var position;
    var percentRes = [];
    var Cy3Array = [];
    var NFArray = [];

    for (var i = 0; i < this.Grid.length; i++) {
      if (i == 0) {
        percentRes[i] = "100.0";
        continue;
      }
      if (i == code1) {
        percentRes[i] = "100.0";
        console.log('Here!');
        continue;
      }
      if (i < code1) {
        position = Math.pow(10, Math.log10(this.Maxlin1) - i * this.spacing1);
        FNF = (position - this.MIN1) / (this.UC2 * (this.MAX1 - position)); 
        ADJ = FNF * this.I9 / this.H9;
      } else if (i > code1) {
        position = Math.pow(10, Math.log10(this.Maxlin2) - (i - code1) * this.spacing2);
        FNF = (position - this.MIN2) / (this.UC3 * (this.MAX2 - position));
        ADJ = FNF * this.K9 / this.J9;
      }
      percent = ADJ / (1 + ADJ);
      percentRes[i] = (percent * 100).toFixed(4);
    }
    this.percentages = percentRes;
    console.log(this.percentages);

    for (var j = 0; j < percentRes.length; j++) {
      Cy3Array[j] = ((percentRes[j] / 100) * this.Volume).toFixed(2);
      NFArray[j] = (this.Volume - Cy3Array[j]).toFixed(2);
    }

    var tableData1 = [];
    var tableData2 = [];

    for (var i = 0; i < code1; i++) {
      var Data1 = {
        code1Num: i + 1,
        Cy3: Cy3Array[i],
        NF: NFArray[i]
      }
      tableData1.push(Data1);
    }
    this.tableCode1 = tableData1;

    for (var j = code1; j < code1 + code2; j++) {
      var Data2 = {
        code1Num: j - code1 + 1,
        Cy3: Cy3Array[j],
        NF: NFArray[j]
      }
      tableData2.push(Data2);
    }
    this.tableCode2 = tableData2;
  }

  /**
   * A submit method to generate a request
   */
  onCreateReq() {
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
    const percentageArray = this.percentages;
    // Add Code1 IDs to the subReqOptions
    this.assayCodeId1s.forEach(function(val, index) {
      // console.log(index, val);
      const subReqData = {
        value: percentageArray[index],
        units: "",
        ordNum: index,
        assayCodeId: val,
        codeReqElemSpecName: localAssayCodeType,
        roleName: "UC1-Bodipy",
        reqElemSpecName: localAssayCodeType,
      }
      subReqOptions.push(subReqData);
    });

    // Add Code2 IDs to the subReqOptions
    this.assayCodeId2s.forEach(function(val, index) {
      const subReqData = {
        value: percentageArray[index + 10],
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
    const generateRequest = {
      request: "generateRequest",
      deptSpecId: 2867745,
      employeeId: 1587869,
      opSpecName: this.opSpecName,
      parentOptions: parentOptions,
      subReqOptions: {"subReqOptionsList": subReqOptions},
    }
    // console.log(generate);

    this.remoteService.remotePostReq(generateRequest).subscribe(res => {
      console.log(res);
      if (res) {
        this.flashMessage.show('Create Work-order Successfully!', {cssClass: 'alert-success', timeout: 5000});
        window.location.reload();
      } else {
        this.flashMessage.show('Error Exists! Check again!');
      }
    });
  }
}