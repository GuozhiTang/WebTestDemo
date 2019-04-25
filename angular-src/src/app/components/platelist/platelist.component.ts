import { Component, OnInit, Input } from '@angular/core';
import { PlateService } from '../../services/plate.service';
import { Plate } from '../../../Plate';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-platelist',
  templateUrl: './platelist.component.html',
  styleUrls: ['./platelist.component.css']
})
export class PlatelistComponent implements OnInit {
  plates: Plate[];
  id: Number;
  barcode_fromtransfer: Number;
  name: String;
  coor: String;
  volume: String;
  description: String;
  searchCoorRes: Plate[];
  emptyCoorRes: Plate[];
  results: object;
  barcode_target: Number;
  barcode_fromtarget: Number;
  barcode_source: Number;
  setUp: String = 'Settled';

  constructor(
    private plateService: PlateService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) {
    this.plateService.getPlates().subscribe(plates => {
      this.plates = plates;
    });
  }

  ngOnInit() {
  }

  // onSearchPlateByBar1() {
  //   const searchBar = {
  //     barcode: this.barcode_fromtransfer
  //   }
  //   this.plateService.searchPlateByBar(searchBar).subscribe(res => {
  //     if (res[0].id != null && res[0].barcode != null && res[0].name != "" && res[0].coor != "" && res[0].volume != "" && res[0].description != "") {
  //       this.flashMessage.show('Submit successfully!', {cssClass: 'alert-success', timeout: 3000});
  //       this.barcode_target = res[0].barcode;
  //       this.setUp = undefined;
  //       // console.log('Submit successfully!');
  //       // console.log(res);
  //     } else {
  //       this.flashMessage.show('Please type correct barcode!', {cssClass: 'alert-danger', timeout: 3000});
  //       console.log('Submit failed!');
  //       // console.log(res);
  //     }
  //   });
  // }

  // onSearchPlateByBar2() {
  //   const searchBar = {
  //     barcode: this.barcode_fromtarget
  //   }
  //   this.plateService.searchPlateByBar(searchBar).subscribe(res => {
  //     if (res[0].id != null && res[0].barcode != null && res[0].name != "" && res[0].coor != "" && res[0].volume != "" && res[0].description != "") {
  //       this.flashMessage.show('Submit successfully!', {cssClass: 'alert-success', timeout: 3000});
  //       this.barcode_source = res[0].barcode;
  //       this.barcode_target = undefined;
  //       // console.log('Submit successfully!');
  //       // console.log(res);
  //     } else {
  //       this.flashMessage.show('Please type correct barcode!', {cssClass: 'alert-danger', timeout: 3000});
  //       console.log('Submit failed!');
  //       // console.log(res);
  //     }
  //   });
  // }

  // onSearchPlatesByCoor(coor) {
  //   const searchCoor = {
  //     coor: coor
  //   }
  //   this.plateService.searchPlatesByCoor(searchCoor).subscribe(res => {
  //     // console.log(typeof(res));
  //     if (res[0].volume != null && res[0] != "") {
  //       this.emptyCoorRes = undefined;
  //       this.searchCoorRes = res;
  //     } else {
  //       this.searchCoorRes = undefined;
  //       this.emptyCoorRes = res;
  //     }
  //   });
  // }
}

