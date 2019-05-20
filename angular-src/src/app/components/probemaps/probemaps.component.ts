import { Component, OnInit } from '@angular/core';
import { ProbemapsService } from '../../services/probemaps.service';
import { Probemap } from '../../../Probemap';
import { Probe } from '../../../Probe';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private probemapsService: ProbemapsService) {
      // show all probemaps locally
      this.probemapsService.getProbemaps().subscribe(probemaps => {
        this.probemaps = probemaps;
      });

      // show all probemaps remotely
      this.probemapsService.getremoteProbemaps().subscribe(remoteprobemaps => {
        this.remoteprobemaps = remoteprobemaps;
        // console.log(this.remoteprobemaps);
      });
    }

  ngOnInit() {
  }

  /**
   * Add new Probemaps with necessary parameters.
   */
  onAddProbemaps() {
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
    this.probemapsService.addProbemap(probemaps).subscribe(data => {
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
  onGrabProbemaps() {
    if (this.probemaps.length == 0) {
      this.probemapsService.grabProbemaps().subscribe(data => {
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
   * Search Probemaps by moduleName
   */
  onSearchProbemapsBymoduleName() {
    const searchmoduleName = {
      moduleName: this.moduleName,
    }
    this.probemapsService.searchProbemapsBymoduleName(searchmoduleName).subscribe(res => {
      this.searchmoduleNameRes = res;
    });
  }

  /**
   * Search Probemaps by Name
   */
  onSearchProbemapsByName() {
    const searchShort = {
      name: this.name
    }
    this.probemapsService.searchProbemapsByName(searchShort).subscribe(res => {
      this.searchNameRes = res;
    });
  }

  /**
   * Search Probemaps by probemaps_id
   */
  onSearchProbemapsById() {
    const searchId = {
      id: this.id
    }
    this.probemapsService.searchProbemapsById(searchId).subscribe(res => {
      this.searchIdRes = res;
    });
  }

  /**
   * Search Probemaps by both moduleName and Name
   */
  onSearchProbemapsByConditions() {
    const conditions = {
      moduleName: this.moduleName_condition,
      name: this.name_condition
    }
    this.probemapsService.searchProbemapsByConditions(conditions).subscribe(res => {
      this.searchConRes = res;
    });
  }

  /**
   * Search Probemaps by creatorName
   */
  onSearchProbemapsByCreator() {
    const creatorName = {
      creatorName: this.creatorName
    }
    this.probemapsService.searchProbemapsByCreator(creatorName).subscribe(res => {
      this.searchCreatorRes = res;
      // console.log(res);
    });
  }

  /**
   * Search and show probes according to specific Probemao_id
   * @param mapId: Probemap Id
   */
  onShowProbe(mapId) {
    const probemapId = {
      mapId: mapId
    }
    this.probemapId = mapId;
    this.probemapsService.showProbes3(probemapId).subscribe(res => {
      this.probeRes = res;
      // console.log("res: " + res.length); 
    });
  }
}
