import { Component, OnInit } from '@angular/core';
import { LabwareSpec } from '../../../models/LabwareSpec';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';
import { DataService } from '../../services/data.service';

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
  module: String = 'fireplex.data.backend.core';

  constructor(
    private flashMessage: FlashMessagesService,
    private remoteService: RemotereqService,
    private dataService: DataService,
    ) {
      // show labwarespecs locally
      this.dataService.getData('LabwareSpec').subscribe(lwarespecs => {
        this.lwarespecs = lwarespecs;
        // console.log(this.lwarespecs);
      });

      // show labwarespecs remotely
      this.remoteService.retrievalData('getLabwareSpecs').subscribe(remotelwarespecs => {
        this.remotelwarespecs = remotelwarespecs;
      });
    }

  ngOnInit() {
  }

  /**
   * Drop the previous labwareSpecs collection
   * Pull newest labwareSpecs collection from data server to local database
   */
  onResetLwareSpecs() {
    this.dataService.resetData('LabwareSpec').subscribe(data => {
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
   * Search Labwarespecs by Name
   */
  onSearchLwareSpecsByName() {
    const searchData = {
      name: this.name,
    }
    this.dataService.searchData('LabwareSpec_name', searchData).subscribe(res => {
      this.searchNameRes = res;
    });
  }

  /**
   * Search Labwarespecs by Manufacturer
   */
  onSearchLwareSpecsByManufacturer() {
    const searchData = {
      manufacturer: this.manufacturer
    }
    this.dataService.searchData('LabwareSpec_manufacturer', searchData).subscribe(res => {
      this.searchManufacturerRes = res;
    });
  }

  /**
   * Search Labwarespecs by Labwarespecs_id
   */
  onSearchLwareSpecsById() {
    const searchData = {
      id: this.id
    }
    this.dataService.searchData('LabwareSpec_id', searchData).subscribe(res => {
      this.searchIdRes = res;
    });
  }

  /**
   * Search Labwarespecs by both name and manufacturer
   */
  onSearchLwareSpecsByConditions() {
    const searchData = {
      name: this.name_condition,
      manufacturer: this.manufacturer_condition
    }
    this.dataService.searchData('LabwareSpec_conditions', searchData).subscribe(res => {
      this.searchConRes = res;
    });
  }

  /**
   * Create new labwareSpec both locally and remotely
   */
  onCreateLabwareSpec() {
    // const remoteCreate = {
    //   request: "fireplexCoreDaoCreation",
    //   coreDaoReqData: {
    //     coreDao: {
    //       moduleName: this.module,
    //       name: this.name_add,
    //       className: "LabwareSpec",
    //       description: this.description_add,
    //       material: this.material_add,
    //       volume: this.volume_add,
    //       cat_num: this.cat_num_add,
    //       manufacturer: this.manufacturer_add,
    //       map_id: this.map_id_add,
    //       id: null
    //     },
    //     pKey: "id",
    //     searchKey: "name"
    //   }
    // }
    const coreDao = {
      moduleName: this.module,
      name: this.name_add,
      className: "LabwareSpec",
      description: this.description_add,
      material: this.material_add,
      volume: this.volume_add,
      cat_num: this.cat_num_add,
      manufacturer: this.manufacturer_add,
      map_id: this.map_id_add,
      id: null
    };
    const Obj = this;
    this.remoteService.createData(coreDao, 'id', 'name').subscribe(res => {
      // console.log(res);
      var newid = res.results[0].id;
      // console.log(newid);
      // const localCreate = {
      //   moduleName: "fireplex.data.backend.core",
      //   name: Obj.name_add,
      //   className: "LabwareSpec",
      //   description: Obj.description_add,
      //   material: Obj.material_add,
      //   volume: Obj.volume_add,
      //   cat_num: Obj.cat_num_add,
      //   manufacturer: Obj.manufacturer_add,
      //   map_id: Obj.map_id_add,
      //   id: newid
      // }
      coreDao.id = newid;
      Obj.dataService.addData('LabwareSpec', coreDao).subscribe(data => {
        if (data.success) {
          Obj.flashMessage.show('Create New LabwareSpec Successfully!', {cssClass: 'alert-success', timeout: 3000});
          window.location.reload();
        } else {
          Obj.flashMessage.show('Create LabwareSpec Failed!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  /**
   * Search by name in order to check if it is existed in the local database
   * @param name name of the labwareSpec which will be created
   */
  searchByName(name) {
    const searchData = {
      name: name,
    }
    this.dataService.searchData('LabwareSpec_name', searchData).subscribe(res => {
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