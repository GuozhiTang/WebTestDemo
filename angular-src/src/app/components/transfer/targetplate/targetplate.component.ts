/*
 * @Description: The target plate of a transfe request in test version mainly for testing the drag and drop plate model. It is not used for now.
 * @Author: Guozhi Tang
 * @Date: 2019-04-22 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:22:15
 */
import { Component, OnInit, Input } from '@angular/core';
import { Plate } from '../../../../models/Plate';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-targetplate',
  templateUrl: './targetplate.component.html',
  styleUrls: ['./targetplate.component.css']
})
export class TargetplateComponent {
  plates: Plate[];
  id: Number;
  barcode: Number;
  name: String;
  coor: String;
  volume: String;
  description: String;
  searchCoorRes: Plate[];
  emptyCoorRes: Plate[];
  results: object;
  @Input() targetbarcode: Number;
  // barcode_typeintarget: String;
  // barcode_sourcejudge: String;
  // @Input() showTarget: boolean = true;
  // showTarget2: boolean = true;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private dataService: DataService,
  ) {
    // Show all plates locally
    this.dataService.getData('Plate').subscribe(plates => {
      this.plates = plates;
    });
  }

  ngOnInit() {
  }

  /**
   * Search plates by coor
   * @param coor the coor of the well on the plate, which means the position
   */
  onSearchPlatesByCoor(coor) {
    const searchData = {
      coor: coor
    }
    // this.plateService.searchPlatesByCoor(searchCoor).subscribe(res => {
    //   console.log(res);
    //   console.log(res[0].id);
    //   this.searchCoorRes = res;
    //   // console.log(typeof(this.searchCoorRes));
    // });
    this.dataService.searchData('Plate_coor', searchData).subscribe(res => {
      // console.log(typeof(res));
      // console.log(res);
      if (res[0].volume != null && res[0] != "") {
        this.emptyCoorRes = undefined;
        this.searchCoorRes = res;
      } else {
        this.searchCoorRes = undefined;
        this.emptyCoorRes = res;
      }
    });
  }

  /**
   * Search plates by barcode
   */
  onSearchPlateByBar() {
    const searchData = {
      barcode: this.barcode
    }

    this.dataService.searchData('Plate_barcode', searchData).subscribe(res => {
      if (res[0].id != null && res[0].barcode != null && res[0].name != "" && res[0].coor != "" && res[0].volume != "" && res[0].description != "") {
        this.flashMessage.show('Submit successfully!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/transfer/sourceplate']);
        // window.location.href = "/transfer/sourceplate";
        // this.barcode_sourcejudge = res[0].barcode;
        // this.targetbarcode = undefined;
        // this.showTarget2 = ! this.showTarget2;
        // this.showTarget = ! this.showTarget;
        // console.log('Submit successfully!');
        // console.log(res);
      } else {
        this.flashMessage.show('Please type correct barcode!', {cssClass: 'alert-danger', timeout: 3000});
        console.log('Submit failed!');
        // console.log(res);
      }
    });
  }

  /**
   * To submit the selected plates
   */
  onSubmitTransfers() {
    this.flashMessage.show('Submit transfer successully!', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/']);
  }
}