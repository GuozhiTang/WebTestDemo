/*
 * @Description: The Code Dilution Request
 * @Author: Guozhi Tang
 * @Date: 2019-08-06 15:18:55
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:14:33
 */
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';
import { CodeMap } from '../../../models/CodeMap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Operator } from '../../../models/Operator';
import { Department } from '../../../models/Department';
import { TableCode } from '../../../models/TableCode';

@Component({
  selector: 'app-codedilutionreq',
  templateUrl: './codedilutionreq.component.html',
  styleUrls: ['./codedilutionreq.component.css']
})
export class CodedilutionreqComponent implements OnInit {
  operator: Operator;
  departments: Department[];
  deptSpecId: Number;
  codeMaps: CodeMap[];
  codeMap: CodeMap;
  assayCodeTypes: String[] = ['CEA Code Req Elem', 'miRNA Code Req Elem'];
  assayCodeType: String = this.assayCodeTypes[1];
  assayCodeId1s: number[];
  assayCodeId2s: number[];
  codeId14x4: number[];
  codeId16x6: number[];
  codeId110x7: number[];
  codeId24x4: number[];
  codeId26x6: number[];
  codeId210x7: number[];
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
  tableCode1: TableCode[];
  tableCode2: TableCode[];
  newReqID: number;

  constructor(
    private flashMessage:FlashMessagesService,
    private remoteService: RemotereqService,
    private modalService: NgbModal,
    public authService:AuthService,
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

    // To get all code map types remotely
    var retrieval = this.remoteService.getCoreDaoReqData('Codemap', ['id'], 'fireplex.data.backend.core', true);
    this.remoteService.retrievalData(retrieval).subscribe(res => {
      // console.log(res);
      this.codeMaps = res.results;
      // console.log(this.codeMaps);
    });

    // To get single code1 Ids based on specific code map type remotely
    var codeId14x4 = [];
    var codeId16x6 = [];
    var codeId110x7 = [];
    this.remoteService.retrievalData('fpGetSingleCode1').subscribe(res => {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        if (i < 4) {
          codeId14x4.unshift(res[i].id);
        } else if (i < 10) {
          codeId16x6.unshift(res[i].id);
        } else {
          codeId110x7.unshift(res[i].id);
        }
      }
      this.codeId14x4 = codeId14x4;
      this.codeId16x6 = codeId16x6;
      this.codeId110x7 = codeId110x7;
      // console.log(codeId110x7);
    });

    // To get single code2 Ids based on specific code map type remotely
    var codeId24x4 = [];
    var codeId26x6 = [];
    var codeId210x7 = [];
    this.remoteService.retrievalData('fpGetSingleCode2').subscribe(res => {
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        if (i < 4) {
          codeId24x4.unshift(res[i].id);
        } else if (i < 10) {
          codeId26x6.unshift(res[i].id);
        } else {
          codeId210x7.unshift(res[i].id);
        }
      }
      this.codeId24x4 = codeId24x4;
      this.codeId26x6 = codeId26x6;
      this.codeId210x7 = codeId210x7;
      // console.log(this.codeId24x4);
      // console.log(this.codeId26x6);
      // console.log(this.codeId210x7);
    });
  }

  ngOnInit() {
  }

  /**
   * Method to get the assay code id list and pass in the speicific data according to selected codemap type
   * @param codeMap Selection of the type of Code Map
   */
  getCodeMapType(codeMap: CodeMap) {
    if (codeMap.name == '16-Plex') {
      console.log('Code Map Type is 4x4!');
      this.assayCodeId1s = this.codeId14x4;
      this.assayCodeId2s = this.codeId24x4;
      this.getParameters([1,2,3,4,1,2,3,4], 1.47287763166735, 2.67968245856451, 0.216645663311592, 0.384960940481029,
        3, 3, 1.47288, 2.67968, 0.11769, 0.1855, 1.1978575844656, 1.38027132448778);
    } else if (codeMap.name == '36-Plex') {
      console.log('Code Map Type is 6x6!');
      this.assayCodeId1s = this.codeId16x6;
      this.assayCodeId2s = this.codeId26x6;
      this.getParameters([1,2,3,4,5,6,1,2,3,4,5,6], 1.47287763166735, 2.67968245856451, 0.216645663311592, 0.384960940481029,
        5, 5, 1.47288, 2.67968, 0.11769, 0.1855, 1.1978575844656, 1.38027132448778);
    } else if (codeMap.name == '70-Plex'){
      console.log('Code Map Type is 10x7!');
      this.assayCodeId1s = this.codeId110x7;
      this.assayCodeId2s = this.codeId210x7;
      this.getParameters([1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7], 0.50, 1.45, 0.046, 0.046, 9, 6,
        0.5, 1.45, 0.042, 0.042, 1.26977603033476, 1.40518121409196);
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
   */
  onCalculate() {
    // Get the amount of code1 and code2 according to different code map types
    var code1 = this.assayCodeId1s.length; 
    var code2 = this.assayCodeId2s.length;

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
   * A submit method to generate code dilution request
   * @param content content area for successful result modal
   */
  onCreateReq(content) {
    // To judge which code map type is chosen
    var typeIndex = this.assayCodeId1s.length;
    
    const localAssayCodeType = this.assayCodeType;
    // Define the parentOptions
    var parentOptions = {
      roleName: 'Code Dils',
      units: "",
      value: 1,
      ordNum: 0,
      reqElemSpecName: this.assayCodeType,
    }

    // Define and get the subReqOptions
    var subReqOptions = [];
    const percentageArray = this.percentages;
    // Add Code1 IDs to the subReqOptions
    // console.log(this.assayCodeId1s);
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
    // console.log(this.assayCodeId2s);
    this.assayCodeId2s.forEach(function(val, index) {
      const subReqData = {
        value: percentageArray[index + typeIndex],
        units: "",
        ordNum: index + typeIndex,
        assayCodeId: val,
        codeReqElemSpecName: localAssayCodeType,
        roleName: "HB",
        reqElemSpecName: localAssayCodeType,
      }
      subReqOptions.push(subReqData);
    });
    // console.log(subReqOptions);

    // Define the json set to generate the request
    const generateRequest = {
      request: "generateRequest",
      deptSpecId: this.deptSpecId,
      employeeId: this.operator.id,
      opSpecName: 'Code Dilution Request',
      parentOptions: parentOptions,
      subReqOptions: {"subReqOptionsList": subReqOptions},
    }
    // console.log(generateRequest);

    this.remoteService.remotePostReq(generateRequest).subscribe(res => {
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