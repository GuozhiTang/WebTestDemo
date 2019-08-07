import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';
import { CodeMap } from '../../../models/CodeMap';

@Component({
  selector: 'app-codemixreq',
  templateUrl: './codemixreq.component.html',
  styleUrls: ['./codemixreq.component.css']
})
export class CodemixreqComponent implements OnInit {
  codeMaps: CodeMap[];
  codeMap: CodeMap;
  assayCodeTypes: String[] = ['CEA Code Req Elem', 'miRNA Code Req Elem'];
  codeMapIds: Number[];
  codeMapTypes: String[];
  codeMapType: String;
  assayCodeType: String;
  codeMapId: Number;
  assayCodeId1s: number[];
  assayCodeId2s: number[];
  codeId14x4: number[];
  codeId16x6: number[];
  codeId110x7: number[];
  codeId24x4: number[];
  codeId26x6: number[];
  codeId210x7: number[];
  check10x7: Boolean = false;
  check4x4: Boolean = false;
  check6x6: Boolean = false; 
  plexId: any;
  id: number = 1;
  Group: any = [{"plexId": ""}];

  constructor(
    private flashMessage: FlashMessagesService,
    private remoteService: RemotereqService,
  ) {

    // To get all code map types remotely
    var codeMapType = [];
    var codeMapId = [];
    var retrieval = this.remoteService.getCoreDaoReqData('Codemap', ['id'], 'fireplex.data.backend.core', 'true');
    this.remoteService.retrievalData(retrieval).subscribe(res => {
      // console.log(res);
      for (var i = 0; i < res.results.length; i++) {
        codeMapType[i] = res.results[i].name;
        codeMapId[i] = res.results[i].id;
      }
      this.codeMaps = res.results;
      // this.codeMapTypes = codeMapType;
      // this.codeMapIds = codeMapId;
      // console.log(this.codeMaps);
      // console.log(this.codeMapTypes);
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
      // console.log(this.codeId14x4);
      // console.log(this.codeId16x6);
      // console.log(this.codeId110x7);
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
   * Method to get the code map type and assay code id type according to user's selection
   * @param codeMap Selection of the type of Code Map
   */
  getCodeMapType(codeMap: CodeMap) {
    // console.log(codeMap);
    if (codeMap.name == '16-Plex') {
      console.log('Code Map Type is 4x4!');
      this.check4x4 = true;
      this.check6x6 = false;
      this.check10x7 = false;
      this.assayCodeId1s = this.codeId14x4;
      this.assayCodeId2s = this.codeId24x4;
      this.codeMapId = codeMap.id;
    } else if (codeMap.name == '36-Plex') {
      console.log('Code Map Type is 6x6!');
      this.check4x4 = false;
      this.check6x6 = true;
      this.check10x7 = false;
      this.assayCodeId1s = this.codeId16x6;
      this.assayCodeId2s = this.codeId26x6;
      this.codeMapId = codeMap.id;      
    } else if (codeMap.name == '70-Plex'){
      console.log('Code Map Type is 10x7!')
      this.check4x4 = false;
      this.check6x6 = false;
      this.check10x7 = true;
      this.assayCodeId1s = this.codeId110x7;
      this.assayCodeId2s = this.codeId210x7;
      this.codeMapId = codeMap.id;
    } else {
      this.check4x4 = false;
      this.check6x6 = false;
      this.check10x7 = false;
    }
    // console.log(this.codeMapId);
  }

  addInput() {
    // let number = this.Group.length + 1;
    this.Group.push({"plexId": ""});
    console.log(this.Group);
  }

  onCreateReq() {
    const localAssayCodeType = this.assayCodeType;
    var parentOptions = {
      roleName: 'Code Mixes',
      units: "",
      value: 1,
      ordNum: 0,
      reqElemSpecName: localAssayCodeType,
    }

    var subReqOptions = [];
    this.assayCodeId1s.forEach(function(val, index) {
      const subReqData = {
        // value: ,
        units: "",
        ordNum: index,
        assayCodeId: val,
        codeReqElemSpecName: localAssayCodeType,
        roleName: "TERPS",
        reqElemSpecName: localAssayCodeType,
      }
      subReqOptions.push(subReqData);
    })

    var generateReq = {
      request: "generateRequest",
      deptSpecId: 2873561,
      employeeId: 1587869,
      opSpecName: 'Code Mix Request',
      parentOptions: parentOptions,
      // subReqOptions: {"subReqOptionsList": },
    }
  }

  onGetCount() {

  }
}
