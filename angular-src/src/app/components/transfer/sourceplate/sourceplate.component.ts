/*
 * @Description: The source plate of a transfe request in test version mainly for testing the drag and drop plate model. It is not used for now.
 * @Author: Guozhi Tang
 * @Date: 2019-04-22 14:00:28
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:22:41
 */
import { Component, OnInit, Input } from '@angular/core';
import { Plate } from '../../../../models/Plate';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-sourceplate',
  templateUrl: './sourceplate.component.html',
  styleUrls: ['./sourceplate.component.css']
})
export class SourceplateComponent implements OnInit {
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
  text: String;
  @Input() sourcebarcode: Number;
  // @Input() showSource : boolean = true;

  constructor(
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
      if (res[0].volume != null && res[0] != "") {
        this.emptyCoorRes = undefined;
        this.searchCoorRes = res;
      } else {
        this.searchCoorRes = undefined;
        this.emptyCoorRes = res;
      }
    });
  }
}