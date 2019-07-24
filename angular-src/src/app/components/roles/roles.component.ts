import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/Role';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[];
  remoteroles: Role[];
  className: String;
  moduleName: String;
  liquid_class: String;
  liquid_class_add: String;
  liquid_class_condition: String;
  role: String;
  role_add: String;
  role_condition: String;
  reagent: Boolean;
  reagent_add: Boolean;
  id: Number;
  searchRoleRes: Role[];
  searchLiquidClassRes: Role[];
  searchIdRes: Role[];
  searchConRes: Role[];
  warningMsg: String;
  checkExist: Boolean = true;
  module: String = "fireplex.data.backend.core";

  constructor(
    private flashMessage: FlashMessagesService,
    private remoteService: RemotereqService,
    private dataService: DataService,
    ) {
      // show all roles locally
      this.dataService.getData('Role').subscribe(roles => {
        this.roles = roles;
      });

      // show all roles remotely
      this.remoteService.retrievalData('getRoles').subscribe(remoteroles => {
        this.remoteroles = remoteroles;
      });
    }

  ngOnInit() {
  }

  /**
   * Drop the previous roles collection
   * Pull newest roles collection from data server to local database
   */
  onResetRoles() {
    this.dataService.resetData('Role').subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Reset Successfully!', {cssClass: 'alert-success', timeout: 3000});
        // console.log('Reset Successfully!');
        window.location.reload();
      } else {
        this.flashMessage.show('Reset Failed!', {cssClass: 'alert-danger', timeout: 3000});
        // console.log('Reset Failed!');
      }
    });
  }

  /**
   * Search Roles by Role
   */
  onSearchRolesByRole() {
    const searchData = {
      role: this.role,
    }
    this.dataService.searchData('Role_role', searchData).subscribe(res => {
      this.searchRoleRes = res;
    });
  }

  /**
   * Search Roles by Liquid_class
   */
  onSearchRolesByLiquidClass() {
    const searchData = {
      liquid_class: this.liquid_class
    }
    this.dataService.searchData('Role_liquidClass', searchData).subscribe(res => {
      this.searchLiquidClassRes = res;
    });
  }

  /**
   * Search Roles by Roles_id
   */
  onSearchRolesById() {
    const searchData = {
      id: this.id
    }
    this.dataService.searchData('Role_id', searchData).subscribe(res => {
      this.searchIdRes = res;
    });
  }

  /**
   * Search Roles by both role and liquid_class
   */
  onSearchRolesByConditions() {
    const searchData = {
      role: this.role_condition,
      liquid_class: this.liquid_class_condition
    }
    this.dataService.searchData('Role_conditions', searchData).subscribe(res => {
      this.searchConRes = res;
    });
  }

  /**
   * Create new role both locally and remotely
   */
  onCreateRole() {
    // const remoteCreate = {
    //   request: "fireplexCoreDaoCreation",
    //   coreDaoReqData: {
    //     coreDao: {
    //       moduleName: "fireplex.data.backend.core",
    //       role: this.role_add,
    //       className: "Role",
    //       reagent: this.reagent_add,
    //       liquid_class: this.liquid_class_add,
    //       id: null
    //     },
    //     pKey: "id",
    //     searchKey: "role"
    //   }
    // }
    const coreDao = {
      moduleName: this.module,
      role: this.role_add,
      className: "Role",
      reagent: this.reagent_add,
      liquid_class: this.liquid_class_add,
      id: null
    }
    const Obj = this;
    this.remoteService.createData(coreDao, 'id', 'role').subscribe(res => {
      // console.log(res);
      var newid = res.results[0].id;
      // console.log(newid);
      // const localCreate = {
      //   moduleName: Obj.module,
      //   role: Obj.role_add,
      //   className: "Role",
      //   reagent: Obj.reagent_add,
      //   liquid_class: Obj.liquid_class_add,
      //   id: newid
      // }
      coreDao.id = newid;
      Obj.dataService.addData('Role', coreDao).subscribe(data => {
        if (data.success) {
          Obj.flashMessage.show('Create New Role Successfully!', {cssClass: 'alert-success', timeout: 3000});
          window.location.reload();
        } else {
          Obj.flashMessage.show('Create Role Failed!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  /**
   * Search by role name in order to check if it is existed in the local database
   * @param role role name of the role which will be created
   */
  searchByRole(role) {
    const searchData = {
      role: role,
    }
    this.dataService.searchData('Role_role', searchData).subscribe(res => {
      // console.log(res[0]);
      if (res[0]) {
        this.warningMsg = 'Role Name already exists in database!';
        this.checkExist = true;
      } else {
        this.warningMsg = undefined;
        this.checkExist = false;
      }
    });
  }
}