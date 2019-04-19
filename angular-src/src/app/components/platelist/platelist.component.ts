import { Component, OnInit, Input } from '@angular/core';
import { PlateService } from '../../services/plate.service';
import { Plate } from '../../../Plate';
// import { DialogService } from 'ngx-bootstrap-modal';
// import $ = require("jquery");

@Component({
  selector: 'app-platelist',
  templateUrl: './platelist.component.html',
  styleUrls: ['./platelist.component.css']
})
export class PlatelistComponent implements OnInit {
  title = 'app';
  plates: Plate[];
  id: String;
  name: String;
  coor: String;
  volume: String;
  description: String;
  searchCoorRes: Plate[];
  emptyCoorRes: Plate[];
  results: object;

  constructor(
    private plateService: PlateService,
    // public dialogService: DialogService
  ) {
    this.plateService.getPlates().subscribe(plates => {
      this.plates = plates;
    });
  }

  ngOnInit() {
  }

  onClick() {
    console.log('Click Successfully!');
  }

  onClickTube() {
    console.log('Click tube successfully!');
  }

  onSearchPlatesByCoor(coor) {
    const searchCoor = {
      coor: coor
    }
    // this.plateService.searchPlatesByCoor(searchCoor).subscribe(res => {
    //   console.log(res);
    //   console.log(res[0].id);
    //   this.searchCoorRes = res;
    //   // console.log(typeof(this.searchCoorRes));
    // });
    this.plateService.searchPlatesByCoor(searchCoor).subscribe(res => {
      // console.log(typeof(res));
      if (res[0].volume == "") {
        this.searchCoorRes = undefined;
        this.emptyCoorRes = res;
      } else {
        this.emptyCoorRes = undefined;
        this.searchCoorRes = res;
      }
    });
  }
}

