import { Component, OnInit, Input } from '@angular/core';
import { PlateService } from '../../../services/plate.service';
import { Plate } from '../../../../Plate';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  // @Input() sourcebarcode: Number;
  // @Input() showSource : boolean = true;

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
