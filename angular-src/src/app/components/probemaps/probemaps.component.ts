import { Component, OnInit } from '@angular/core';
import { Probemap } from '../../../models/Probemap';
import { Probe } from '../../../models/Probe';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-probemaps',
  templateUrl: './probemaps.component.html',
  styleUrls: ['./probemaps.component.css']
})
export class ProbemapsComponent implements OnInit {
  probemaps: Probemap[];
  remoteprobemaps: Probemap[];
  className: String;
  className_add: String;
  moduleName: String;
  moduleName_add: String;
  moduleName_condition: String;
  name: String;
  name_add: String;
  name_condition: String;
  creator: Object;
  creator_add: Object;
  codemap_id: Object;
  codemap_id_add: Object;
  most_current: Number;
  most_current_add: Number;
  id: Number;
  id_add: Number;
  creatorName: String;
  searchmoduleNameRes: Probemap[];
  searchNameRes: Probemap[];
  searchIdRes: Probemap[];
  searchConRes: Probemap[];
  searchCreatorRes: Probemap[];
  probeRes: Probe[];
  probemapId: Number;

  constructor(
    private flashMessage: FlashMessagesService,
    private remoteService: RemotereqService,
    private dataService: DataService,
    ) {
      // show all probemaps locally
      this.dataService.getData('Probemap').subscribe(probemaps => {
        this.probemaps = probemaps;
      });

      // show all probemaps remotely
      this.remoteService.retrievalData('getAllProbemaps').subscribe(remoteprobemaps => {
        this.remoteprobemaps = remoteprobemaps;
        // console.log(this.remoteprobemaps);
      });
    }

  ngOnInit() {
  }

  /**
   * Add new Probemaps with necessary parameters.
   */
  onCreateProbemaps() {
    const probemaps = {
      className: this.className_add,
      moduleName: this.moduleName_add,
      name: this.name_add,
      creator: this.creator_add,
      codemap_id: this.codemap_id_add,
      most_current: this.most_current_add,
      id: this.id_add,
    }
    // Add Probemap
    this.dataService.addData('Probemap', probemaps).subscribe(data => {
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
   * Functionality to pull all probemaps data from data server.
   */
  onResetProbemaps() {
    this.dataService.resetData('Probemap').subscribe(data => {
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
   * Search Probemaps by moduleName
   */
  onSearchProbemapsBymoduleName() {
    const searchData = {
      moduleName: this.moduleName,
    }
    this.dataService.searchData('Probemap_moduleName', searchData).subscribe(res => {
      this.searchmoduleNameRes = res;
    });
  }

  /**
   * Search Probemaps by Name
   */
  onSearchProbemapsByName() {
    const searchData = {
      name: this.name
    }
    this.dataService.searchData('Probemap_name', searchData).subscribe(res => {
      this.searchNameRes = res;
    });
  }

  /**
   * Search Probemaps by probemaps_id
   */
  onSearchProbemapsById() {
    const searchData = {
      id: this.id
    }
    this.dataService.searchData('Probemap_id', searchData).subscribe(res => {
      this.searchIdRes = res;
    });
  }

  /**
   * Search Probemaps by both moduleName and Name
   */
  onSearchProbemapsByConditions() {
    const searchData = {
      moduleName: this.moduleName_condition,
      name: this.name_condition
    }
    this.dataService.searchData('Probemap_conditions', searchData).subscribe(res => {
      this.searchConRes = res;
    });
  }

  /**
   * Search Probemaps by creatorName
   */
  onSearchProbemapsByCreator() {
    const searchData = {
      creatorName: this.creatorName
    }
    this.dataService.searchData('Probemap_creator', searchData).subscribe(res => {
      this.searchCreatorRes = res;
      // console.log(res);
    });
  }

  /**
   * Search and show probes according to specific Probemao_id
   * @param mapId: Probemap Id
   */
  onShowProbe(mapId) {
    const searchData = {
      mapId: mapId
    }
    this.probemapId = mapId;
    this.dataService.searchData('Probemap_probemapId', searchData).subscribe(res => {
      this.probeRes = res;
      // console.log("res: " + res.length); 
    });
  }
}