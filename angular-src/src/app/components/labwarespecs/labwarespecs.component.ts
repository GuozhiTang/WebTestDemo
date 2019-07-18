import { Component, OnInit } from '@angular/core';
import { LabwarespecsService } from '../../services/labwarespecs.service';
import { LabwareSpec } from '../../../LabwareSpec';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-labwarespecs',
  templateUrl: './labwarespecs.component.html',
  styleUrls: ['./labwarespecs.component.css']
})
export class LabwarespecsComponent implements OnInit {
  lwarespecs: LabwareSpec[];
  remotelwarespecs: LabwareSpec[];
  className: String;
  moduleName: String;
  map_id: Object;
  map_id_add: Object;
  name: String;
  name_add: String;
  name_condition: String;
  description: String;
  description_add: String;
  material: String;
  material_add: String;
  volume: String;
  volume_add: String;
  cat_num: String;
  cat_num_add: String;
  manufacturer: String;
  manufacturer_add: String;
  manufacturer_condition: String;
  id: Number;
  id_add: Number;
  searchNameRes: LabwareSpec[];
  searchManufacturerRes: LabwareSpec[];
  searchIdRes: LabwareSpec[];
  searchConRes: LabwareSpec[]; 
  warningMsg: String;
  checkExist: Boolean = true;

  constructor(
    private flashMessage: FlashMessagesService,
    private labwarespecsService: LabwarespecsService) {
      // show labwarespecs locally
      this.labwarespecsService.getLabwareSpecs().subscribe(lwarespecs => {
        this.lwarespecs = lwarespecs;
      });

      // show labwarespecs remotely
      this.labwarespecsService.getremoteLabwareSpecs().subscribe(remotelwarespecs => {
        this.remotelwarespecs = remotelwarespecs;
      });
    }

  ngOnInit() {
  }

  /**
   * Functionality to pull all labwarespecs data from data server.
   */
  onGrabLwareSpecs() {
    if (this.lwarespecs.length == 0) {
      this.labwarespecsService.grabLabwareSpecs().subscribe(data => {
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
      this.flashMessage.show('Data already in database!', {cssClass: 'alert-danger', timeour: 3000});
    }

  }

  /**
   * Search Labwarespecs by Name
   */
  onSearchLwareSpecsByName() {
    const searchName = {
      name: this.name,
    }
    this.labwarespecsService.searchLwarespecsByName(searchName).subscribe(res => {
      this.searchNameRes = res;
    });
  }

  /**
   * Search Labwarespecs by Manufacturer
   */
  onSearchLwareSpecsByManufacturer() {
    const searchManufacturer = {
      manufacturer: this.manufacturer
    }
    this.labwarespecsService.searchLwarespecsByManufacturer(searchManufacturer).subscribe(res => {
      this.searchManufacturerRes = res;
    });
  }

  /**
   * Search Labwarespecs by Labwarespecs_id
   */
  onSearchLwareSpecsById() {
    const searchId = {
      id: this.id
    }
    this.labwarespecsService.searchLwarespecsById(searchId).subscribe(res => {
      this.searchIdRes = res;
    });
  }

  /**
   * Search Labwarespecs by both name and manufacturer
   */
  onSearchLwareSpecsByConditions() {
    const conditions = {
      name: this.name_condition,
      manufacturer: this.manufacturer_condition
    }
    this.labwarespecsService.searchLwarespecsByConditions(conditions).subscribe(res => {
      this.searchConRes = res;
    });
  }

  createLabwareSpec() {
    const remoteCreate = {
      request: "fireplexCoreDaoCreation",
      coreDaoReqData: {
        coreDao: {
          moduleName: "fireplex.data.backend.core",
          name: this.name_add,
          className: "LabwareSpec",
          description: this.description_add,
          material: this.material_add,
          volume: this.volume_add,
          cat_num: this.cat_num_add,
          manufacturer: this.manufacturer_add,
          map_id: this.map_id_add,
          id: null
        },
        pKey: "id",
        searchKey: "name"
      }
    }
    const Obj = this;
    this.labwarespecsService.createLabwareSpec(remoteCreate).subscribe(res => {
      // console.log(res);
      var newid = res.results[0].id;
      // console.log(newid);
      const localCreate = {
        moduleName: "fireplex.data.backend.core",
        name: Obj.name_add,
        className: "LabwareSpec",
        description: Obj.description_add,
        material: Obj.material_add,
        volume: Obj.volume_add,
        cat_num: Obj.cat_num_add,
        manufacturer: Obj.manufacturer_add,
        map_id: Obj.map_id_add,
        id: newid
      }
      Obj.labwarespecsService.addLabwareSpec(localCreate).subscribe(data => {
        if (data.success) {
          Obj.flashMessage.show('Create New LabwareSpec Successfully!', {cssClass: 'alert-success', timeout: 3000});
          window.location.reload();
        } else {
          Obj.flashMessage.show('Create LabwareSpec Failed!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  searchByName(name) {
    const searchname = {
      name: name,
    }
    this.labwarespecsService.searchLwarespecsByName(searchname).subscribe(res => {
      // console.log(res[0]);
      if (res[0]) {
        this.warningMsg = 'Name already exists in database!';
        this.checkExist = true;
      } else {
        this.warningMsg = undefined;
        this.checkExist = false;
      }
    });
  }
}
