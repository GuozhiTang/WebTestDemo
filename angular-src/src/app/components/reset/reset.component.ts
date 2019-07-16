import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  operators: Object;
  remoteoperators: Object;
  Name: String;
  Manufacturing: Boolean;
  checkExist: Boolean = true;
  warningMsg: String;

  constructor(
    private validate: ValidateService,
    private flashMessage: FlashMessagesService,
  ) {
    this.validate.getOperators().subscribe(operators => {
      this.operators = operators;
      // console.log(this.operators);
    });
    
    const remoteReq = {
      request: "getOperators"
    }
    this.validate.getRemoteOperators(remoteReq).subscribe(remote => {
      this.remoteoperators = remote;
    })
  }

  ngOnInit() {
  }

  onGrabOperators() {
    this.validate.grabOperators().subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Grab Successfully!', {cssClass: 'alert-success', timeout: 3000});
        // console.log('Grab Successfully!');
        location.reload();
      } else {
        this.flashMessage.show('Grab Failed!', {cssClass: 'alert-danger', timeout: 3000});
        // console.log('Grab Failed!');
      }
    });
  }

  createOperator() {
    const remoteCreate = {
      request: "fireplexCoreDaoCreation",
      coreDaoReqData: {
        coreDao: {
          moduleName: "fireplex.data.backend.core",
          name: this.Name,
          admin: true,
          className: "Operator",
          active: true,
          manufacturing: this.Manufacturing,
          id: null
        },
        pKey: "id",
        searchKey: "name"
      }
    }
    var Obj = this;
    this.validate.createOperators(remoteCreate).subscribe(res => {
      // console.log(res);
      var newid = res.results[0].id;
      // console.log(newid);
      const localCreate = {
        moduleName: "fireplex.data.backend.core",
        name: Obj.Name,
        admin: true,
        className: "Operator",
        active: true,
        manufacturing: Obj.Manufacturing,
        id: newid
      }
      Obj.validate.addOperators(localCreate).subscribe(data => {
        if (data.success) {
          Obj.flashMessage.show('Create New Operator Successfully!', {cssClass: 'alert-success', timeout: 3000});
          window.location.reload();
        } else {
          Obj.flashMessage.show('Create Operator Failed!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  searchByName(name) {
    const operator = {
      name: name,
    }
    this.validate.searchByName(operator).subscribe(res => {
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
}
