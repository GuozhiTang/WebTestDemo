import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';
import { DataService } from '../../services/data.service';
import { Operator } from '../../../models/Operator';
import { OperatorDept } from '../../../models/OperatorDept';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {
  operators: Operator[];
  remoteoperators: Operator[];
  operatordepts: OperatorDept[];
  remoteoperatordepts: OperatorDept[];
  Name: String;
  Manufacturing: Boolean;
  checkExist: Boolean = true;
  warningMsg: String;
  module: String = 'fireplex.data.backend.core';

  constructor(
    private flashMessage: FlashMessagesService,
    private remoteService: RemotereqService,
    private dataService: DataService,
  ) {
    // show all operators locally
    this.dataService.getData('Operator').subscribe(operators => {
      this.operators = operators;
      // console.log(this.operators);
    });
    
    // show all operators remotely
    this.remoteService.retrievalData('getOperators').subscribe(remote => {
      this.remoteoperators = remote;
    });

    // show all operatordepts locally
    this.dataService.getData('OperatorDept').subscribe(operatordepts => {
      this.operatordepts = operatordepts;
      // console.log(this.operatordepts);
    });
    
    // show all operatordepts remotely
    var opDept = this.remoteService.getCoreDaoReqData('OperatorDept', ['id'], 'fireplex.data.backend.core', 'true');
    this.remoteService.retrievalData(opDept).subscribe(remote => {
      this.remoteoperatordepts = remote.results;
      // console.log(this.remoteoperatordepts);
    });
  }

  ngOnInit() {
  }

  /**
   * Drop the previous operators collection
   * Pull newest operators collection from data server to local database
   */
  onResetOperators() {
    this.dataService.resetData('Operator').subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Reset Successfully!', {cssClass: 'alert-success', timeout: 3000});
        // console.log('Reset Successfully!');
        location.reload();
      } else {
        this.flashMessage.show('Reset Failed!', {cssClass: 'alert-danger', timeout: 3000});
        // console.log('Reset Failed!');
      }
    });
  }

  /**
   * Create new operator both locally and remotely
   */
  onCreateOperator() {
    // const remoteCreate = {
    //   request: "fireplexCoreDaoCreation",
    //   coreDaoReqData: {
    //     coreDao: {
    //       moduleName: "fireplex.data.backend.core",
    //       name: this.Name,
    //       admin: true,
    //       className: "Operator",
    //       active: true,
    //       manufacturing: this.Manufacturing,
    //       id: null
    //     },
    //     pKey: "id",
    //     searchKey: "name"
    //   }
    // }
    const coreDao = {
      moduleName: this.module,
      name: this.Name,
      admin: true,
      className: "Operator",
      active: true,
      manufacturing: this.Manufacturing,
      id: null
    }
    // console.log(coreDao);
    const Obj = this;
    this.remoteService.createData(coreDao, 'id', 'name').subscribe(res => {
      // console.log(res);
      var newid = res.results[0].id;
      // console.log(newid);
      // const localCreate = {
      //   moduleName: Obj.module,
      //   name: Obj.Name,
      //   admin: true,
      //   className: "Operator",
      //   active: true,
      //   manufacturing: Obj.Manufacturing,
      //   id: newid
      // }
      coreDao.id = newid;
      // console.log(coreDao);
      Obj.dataService.addData('Operator', coreDao).subscribe(data => {
        if (data.success) {
          Obj.flashMessage.show('Create New Operator Successfully!', {cssClass: 'alert-success', timeout: 3000});
          window.location.reload();
        } else {
          Obj.flashMessage.show('Create Operator Failed!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  /**
   * Search by name in order to check if it is existed in the local database
   * @param name name of the operator which will be created
   */
  onSearchByName(name) {
    const searchData = {
      name: name,
    }
    this.dataService.searchData('Operator_name', searchData).subscribe(res => {
      // console.log(res[0]);
      if (res[0]) {
        // console.log('Name already exists in database!');
        this.warningMsg = 'Name already exists in database!';
        this.checkExist = true;
      } else {
        // console.log('Can be used!');
        this.warningMsg = undefined;
        this.checkExist = false;
      }
    });
  }

  /**
   * Drop the previous operatordepts collection
   * Pull newest operatordepts collection from data server to local database
   */
  onResetOperatorDepts() {
    this.dataService.resetData('OperatorDept').subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Reset Successfully!', {cssClass: 'alert-success', timeout: 3000});
        // console.log('Reset Successfully!');
        location.reload();
      } else {
        this.flashMessage.show('Reset Failed!', {cssClass: 'alert-danger', timeout: 3000});
        // console.log('Reset Failed!');
      }
    });
  }
}