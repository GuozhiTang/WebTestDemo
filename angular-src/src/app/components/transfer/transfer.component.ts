import { Component, OnInit } from '@angular/core';
import { Plate } from '../../../Plate';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataService } from '../../services/data.service';

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
  targetjudge: boolean = true;
  // barcode_typeintransfer: String;
  barcode_targetjudge: Number;
  // transferjudge: String = 'something';
  showTransfer: boolean = false;

  constructor(
    private flashMessage: FlashMessagesService,
    private dataService: DataService,
  ) {
    this.dataService.getData('Plate').subscribe(plates => {
      this.plates = plates;
      // console.log(this.plates);
    });
  }

  ngOnInit() {
    // console.log(this.showTransfer);
  }

  onSearchPlateByBar() {
    const searchData = {
      barcode: this.barcode
    }
    this.dataService.searchData('Plate_barcode', searchData).subscribe(res => {
      if (res[0].id != null && res[0].barcode != null && res[0].name != "" && res[0].coor != "" && res[0].volume != "" && res[0].description != "") {
        this.flashMessage.show('Submit successfully!', {cssClass: 'alert-success', timeout: 3000});
        this.targetjudge = false;
        // this.router.navigate(['/transfer/targetplate']);
        // window.location.href = "/transfer/targetplate";
        this.barcode_targetjudge = res[0].barcode;
        // this.transferjudge = undefined;
        this.showTransfer = true;
        // console.log('Submit successfully!');
        // console.log(res);
      } else {
        this.flashMessage.show('Please type correct barcode!', {cssClass: 'alert-danger', timeout: 3000});
        // console.log('Submit failed!');
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