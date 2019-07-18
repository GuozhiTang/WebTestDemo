import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../../Role';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(
    private flashMessage: FlashMessagesService,
    private rolesService: RolesService) {
      // show all roles locally
      this.rolesService.getRoles().subscribe(roles => {
        this.roles = roles;
      });

      // show all roles remotely
      this.rolesService.getremoteRoles().subscribe(remoteroles => {
        this.remoteroles = remoteroles;
      });
    }

  ngOnInit() {
  }

  /**
   * Functionality to pull all roles data from data server.
   */
  onGrabRoles() {
    if (this.roles.length == 0) {
      this.rolesService.grabRoles().subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Grab Successfully!', {cssClass: 'alert-success', timeout: 3000});
          // console.log('Grab Successfully!');
          location.reload();
        } else {
          this.flashMessage.show('Grab Failed!', {cssClass: 'alert-danger', timeout: 3000});
          // console.log('Grab Failed!');
        }
      });
    } else {
      this.flashMessage.show('Data already in database!', {cssClass: 'alert-danger', timeout: 3000});
    }
  }

  /**
   * Search Roles by Role
   */
  onSearchRolesByRole() {
    const searchRole = {
      role: this.role,
    }
    this.rolesService.searchRolesByRole(searchRole).subscribe(res => {
      this.searchRoleRes = res;
    });
  }

  /**
   * Search Roles by Liquid_class
   */
  onSearchRolesByLiquidClass() {
    const searchLiquidClass = {
      liquid_class: this.liquid_class
    }
    this.rolesService.searchRolesByLiquidClass(searchLiquidClass).subscribe(res => {
      this.searchLiquidClassRes = res;
    });
  }

  /**
   * Search Roles by Roles_id
   */
  onSearchRolesById() {
    const searchId = {
      id: this.id
    }
    this.rolesService.searchRolesById(searchId).subscribe(res => {
      this.searchIdRes = res;
    });
  }

  /**
   * Search Roles by both role and liquid_class
   */
  onSearchRolesByConditions() {
    const conditions = {
      role: this.role_condition,
      liquid_class: this.liquid_class_condition
    }
    this.rolesService.searchRolesByConditions(conditions).subscribe(res => {
      this.searchConRes = res;
    });
  }

  createRole() {
    const remoteCreate = {
      request: "fireplexCoreDaoCreation",
      coreDaoReqData: {
        coreDao: {
          moduleName: "fireplex.data.backend.core",
          role: this.role_add,
          className: "Role",
          reagent: this.reagent_add,
          liquid_class: this.liquid_class_add,
          id: null
        },
        pKey: "id",
        searchKey: "role"
      }
    }
    const Obj = this;
    this.rolesService.createRoles(remoteCreate).subscribe(res => {
      // console.log(res);
      var newid = res.results[0].id;
      // console.log(newid);
      const localCreate = {
        moduleName: "fireplex.data.backend.core",
        role: Obj.role_add,
        className: "Role",
        reagent: Obj.reagent_add,
        liquid_class: Obj.liquid_class_add,
        id: newid
      }
      Obj.rolesService.addRole(localCreate).subscribe(data => {
        if (data.success) {
          Obj.flashMessage.show('Create New Role Successfully!', {cssClass: 'alert-success', timeout: 3000});
          window.location.reload();
        } else {
          Obj.flashMessage.show('Create Role Failed!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  searchByRole(role) {
    const rolename = {
      role: role,
    }
    this.rolesService.searchRolesByRole(rolename).subscribe(res => {
      // console.log(res[0]);
      if (res[0]) {
        this.warningMsg = 'Role already exists in database!';
        this.checkExist = true;
      } else {
        this.warningMsg = undefined;
        this.checkExist = false;
      }
    });
  }
}