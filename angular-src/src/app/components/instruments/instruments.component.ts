import { Component, OnInit } from '@angular/core';
import { InstrumentsService } from '../../services/instruments.service';
import { Instrument } from '../../../Instrument';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {
  instruments: Instrument[];
  remoteinstruments: Instrument[];
  className: String;
  className_add: String;
  moduleName: String;
  moduleName_add: String;
  moduleName_condition: String;
  short: String;
  short_add: String;
  short_condition: String;
  spec_id: Object;
  spec_id_add: Object;
  id: Number;
  id_add: Number;
  searchmoduleNameRes: Instrument[];
  searchShortRes: Instrument[];
  searchIdRes: Instrument[];
  searchConRes: Instrument[];

  constructor(
    private flashMessage: FlashMessagesService,
    private instrumentsService: InstrumentsService) {
      // show all instruments locally
      this.instrumentsService.getInstruments().subscribe(instruments => {
        this.instruments = instruments;
      });

      // show all instruments remotely
      this.instrumentsService.getremoteInstruments().subscribe(remoteinstruments => {
        this.remoteinstruments = remoteinstruments;
        // console.log(this.remoteinstruments);
      });
    }

  ngOnInit() {
  }

  /**
   * Add new Instrument with necessary parameters.
   */
  onAddInstruments() {
    const instruments = {
      className: this.className_add,
      moduleName: this.moduleName_add,
      short: this.short_add,
      spec_id: this.spec_id_add,
      id: this.id_add,
    }
    // Add Instrument
    this.instrumentsService.addInstrument(instruments).subscribe(data => {
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
   * Functionality to pull all instruments data from data server.
   */
  onGrabInstruments() {
    // console.log(this.instruments);
    // if (this.instruments.length == 0) {
    //   console.log('No data in instruments!');
    // } else {
    //   console.log('Data already in instruments!');
    // }
    if (this.instruments.length == 0) {
      this.instrumentsService.grabInstruments().subscribe(data => {
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
   * Search Instruments by moduleName
   */
  onSearchInstrumentsBymoduleName() {
    const searchmoduleName = {
      moduleName: this.moduleName,
    }
    this.instrumentsService.searchInstrumentsBymoduleName(searchmoduleName).subscribe(res => {
      this.searchmoduleNameRes = res;
    });
  }

  /**
   * Search Instruments by short
   */
  onSearchInstrumentsByShort() {
    const searchShort = {
      short: this.short
    }
    this.instrumentsService.searchInstrumentsByShort(searchShort).subscribe(res => {
      this.searchShortRes = res;
    });
  }

  /**
   * Search Instruments by instrument_id
   */
  onSearchInstrumentsById() {
    const searchId = {
      id: this.id
    }
    this.instrumentsService.searchInstrumentsById(searchId).subscribe(res => {
      this.searchIdRes = res;
    });
  }

  /**
   * Search Instrumenbrts by both moduleName and short
   */
  onSearchInstrumentsByConditions() {
    const conditions = {
      moduleName: this.moduleName_condition,
      short: this.short_condition
    }
    this.instrumentsService.searchInstrumentsByConditions(conditions).subscribe(res => {
      this.searchConRes = res;
    });
  }
}
