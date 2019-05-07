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
  className_add: String;
  moduleName: String;
  moduleName_add: String;
  moduleName_condition: String;
  liquid_class: String;
  liquid_class_add: String;
  role: String;
  role_add: String;
  role_condition: String;
  reagent: Boolean;
  reagent_add: Boolean;
  id: Number;
  id_add: Number;
  searchRoleRes: Role[];
  searchModuleNameRes: Role[];
  searchIdRes: Role[];
  searchConRes: Role[];

  constructor(
    private flashMessage: FlashMessagesService,
    private rolesService: RolesService) {
      this.rolesService.getRoles().subscribe(roles => {
        this.roles = roles;
      });

      this.rolesService.getremoteRoles().subscribe(remoteroles => {
        this.remoteroles = remoteroles;
      });
    }

  ngOnInit() {
  }

  onAddRoles() {
    const role = {
      moduleName: this.moduleName_add,
      className: this.className_add,
      liquid_class: this.liquid_class_add,
      role: this.role_add,
      reagent: this.reagent_add,
      id: this.id_add,
    }

    // Add Role
    this.rolesService.addRole(role).subscribe(data => {
      if (data.success) {
        console.log('Add Successfully!');
      } else {
        console.log('Add Failed!');
      }
    });
  }

  onGrabRoles() {
    this.rolesService.grabRoles().subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Grab Successfully!', {cssClass: 'alert-success', timeout: 3000});
        console.log('Grab Successfully!');
        location.reload();
      } else {
        this.flashMessage.show('Grab Failed!', {cssClass: 'alert-danger', timeout: 3000});
        console.log('Grab Failed!');
      }
    });
  }

  onSearchRolesByRole() {
    const searchRole = {
      role: this.role,
    }
    this.rolesService.searchRolesByRole(searchRole).subscribe(res => {
      this.searchRoleRes = res;
    });
  }

  onSearchRolesByModuleName() {
    const searchModuleName = {
      moduleName: this.moduleName
    }
    this.rolesService.searchRolesByModuleName(searchModuleName).subscribe(res => {
      this.searchModuleNameRes = res;
    });
  }

  onSearchRolesById() {
    const searchId = {
      id: this.id
    }
    this.rolesService.searchRolesById(searchId).subscribe(res => {
      this.searchIdRes = res;
    });
  }

  onSearchRolesByConditions() {
    const conditions = {
      role: this.role_condition,
      moduleName: this.moduleName_condition
    }
    this.rolesService.searchRolesByConditions(conditions).subscribe(res => {
      this.searchConRes = res;
    });
  }
}
