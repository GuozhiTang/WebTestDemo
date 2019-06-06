import { Component, OnInit, Input } from '@angular/core';
import { PlateService } from '../../../services/plate.service';
import { Plate } from '../../../../Plate';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  onSearchPlateByBar() {
    const searchBar = {
      barcode: this.barcode
    }

    this.plateService.searchPlateByBar(searchBar).subscribe(res => {
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

  onSubmitTransfers() {
    this.flashMessage.show('Submit transfer successully!', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/']);
  }
}
