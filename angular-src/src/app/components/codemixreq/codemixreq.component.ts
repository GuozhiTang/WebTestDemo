import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';
import { CodeMap } from '../../../models/CodeMap';
import { CodeData } from '../../../models/CodeData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Operator } from '../../../models/Operator';
import { Department } from '../../../models/Department';

@Component({
  selector: 'app-codemixreq',
  templateUrl: './codemixreq.component.html',
  styleUrls: ['./codemixreq.component.css']
})
export class CodemixreqComponent implements OnInit {
  operator: Operator;
  departments: Department[];
  deptSpecId: Number;
  codeMaps: CodeMap[];
  codeMap: CodeMap;
  assayCodeTypes: String[] = ['CEA Code Req Elem', 'miRNA Code Req Elem'];
  assayCodeType: String = this.assayCodeTypes[1];
  codeMapId: Number;
  plexId: String;
  code1Data: CodeData[];
  code2Data: CodeData[];
  newReqID: String;

  constructor(
    private flashMessage: FlashMessagesService,
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

    // To get all code map objects remotely
    var retrieval = this.remoteService.getCoreDaoReqData('Codemap', ['id'], 'fireplex.data.backend.core', true);
    this.remoteService.retrievalData(retrieval).subscribe(res => {
      // console.log(res);
      this.codeMaps = res.results;
      // console.log(this.codeMaps);
    });
  }

  ngOnInit() {
  }

  /**
   * Method mainly to get the code map id according to selected codeMap type
   * @param codeMap Selection of the type of Code Map
   */
  getCodeMapType(codeMap: CodeMap) {
    // console.log(codeMap);
    if (codeMap.name == '16-Plex') {
      console.log('Code Map Type is 4x4!');
      this.codeMapId = codeMap.id;
      this.plexId = "2874303\n2874298";
    } else if (codeMap.name == '36-Plex') {
      console.log('Code Map Type is 6x6!');
      this.codeMapId = codeMap.id;
      this.plexId = "2874303\n2874298";
    } else if (codeMap.name == '70-Plex'){
      console.log('Code Map Type is 10x7!');
      this.codeMapId = codeMap.id;
      this.plexId = "2874303\n2874298\n2874312";
    } 
  }

  /**
   * Method to get the code data for code1 and code2 from the plexId
   */
  onGetCodeData() {
    // console.log(typeof(this.plexId));
    // console.log(this.plexId);
    var plexIdList = [];
    // Split the string to a string array
    var temp = this.plexId.split(/[\n,]/g);
    // Delete the empty parameter
    for (var i = 0; i < temp.length; i++) {
      if (temp[i] == "") {
        temp.splice(i, 1);
        i--;
      }
    }
    // Convert a string array to an integer array
    temp.forEach(function(data, index, arr) {
      plexIdList.push(+data);
    });
    // console.log(plexIdList);
    // console.log(temp);

    // Get the code data from the plexIdList
    const codeData = {
      request: "fpCodeDataFromPlexList",
      codemapId: this.codeMapId,
      plexIdList: plexIdList
    }
    this.remoteService.remotePostReq(codeData).subscribe(res => {
      // console.log(res.results);
      this.code1Data = res.results.code1;
      this.code2Data = res.results.code2;
      // console.log(this.code1Data);
      // console.log(this.code2Data);
    });
  }

  /**
   * The submit method to generate code mix request
   * @param content content area for successful result modal
   */
  onCreateReq(content) {
    const localAssayCodeType = this.assayCodeType;
    // Define the parentOptions
    var parentOptions = {
      roleName: 'Code Mixes',
      units: "",
      value: 1,
      ordNum: 0,
      reqElemSpecName: localAssayCodeType,
    }

    // Define and get the subReqOptions
    var subReqOptions = [];
    this.code1Data.forEach(function(val, index) {
      const subReqData = {
        value: val.count,
        units: "",
        ordNum: index,
        assayCodeId: val.assayCodeId,
        codeReqElemSpecName: localAssayCodeType,
        roleName: "TERPS",
        reqElemSpecName: localAssayCodeType,
      }
      subReqOptions.push(subReqData);
    });
    
    var length = this.code1Data.length;
    this.code2Data.forEach(function(val, index) {
      const subReqData = {
        value: val.count,
        units: "",
        ordNum: index + length,
        assayCodeId: val.assayCodeId,
        codeReqElemSpecName: localAssayCodeType,
        roleName: "TERPS",
        reqElemSpecName: localAssayCodeType,
      }
      subReqOptions.push(subReqData);
    });
    // console.log(subReqOptions);

    // Define the json set to generate the request
    var generateReq = {
      request: "generateRequest",
      deptSpecId: this.deptSpecId,
      employeeId: this.operator.id,
      opSpecName: 'Code Mix Request',
      parentOptions: parentOptions,
      subReqOptions: {"subReqOptionsList": subReqOptions},
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
