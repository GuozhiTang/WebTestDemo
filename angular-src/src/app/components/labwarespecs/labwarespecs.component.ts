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
  className_add: String;
  moduleName: String;
  moduleName_add: String;
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
   * Add new Labwarespecs with necessary parameters.
   */
  onAddLwareSpecs() {
    const lwarespecs = {
      className: this.className_add,
      moduleName: this.moduleName_add,
      map_id: this.map_id_add,
      name: this.name_add,
      description: this.description_add,
      material: this.material_add,
      volume: this.volume_add,
      cat_num: this.cat_num_add,
      manufacturer: this.manufacturer_add,
      id: this.id_add,
    }
    // Add LabwareSpec
    this.labwarespecsService.addLabwareSpec(lwarespecs).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Add Successfully!', {cssClass: 'alert-success', timeout: 3000});
        // console.log('Add Successfully!');
        location.reload();
      } else {
        this.flashMessage.show('Add Failed!', {cssClass: 'alert-danger', timeout: 3000});
        // console.log('Add Failed!');
      }
    });
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
}
