import { Component, OnInit } from '@angular/core';
import { PlateService } from '../../services/plate.service';
import { Plate } from '../../../Plate';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
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

  onSearchPlateByBar() {
    const searchBar = {
      barcode: this.barcode
    }

    this.plateService.searchPlateByBar(searchBar).subscribe(res => {
      if (res[0].id != null && res[0].barcode != null && res[0].name != "" && res[0].coor != "" && res[0].volume != "" && res[0].description != "") {
        this.flashMessage.show('Submit successfully!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/transfer/targetplate']);
        window.location.href = "/transfer/targetplate/";
        // console.log('Submit successfully!');
        // console.log(res);
      } else {
        this.flashMessage.show('Please type correct barcode!', {cssClass: 'alert-danger', timeout: 3000});
        console.log('Submit failed!');
        // console.log(res);
      }
    });
  }

  showBarcode() {
    const showBar = {
      barcode: this.barcode
    }
    return showBar;
  }
}
