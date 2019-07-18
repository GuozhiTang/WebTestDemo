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
  moduleName: String;
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
  instrumentSpecs: {
    moduleName: String;
    className: String;
    model: String;
    manufacturer: String;
    type: String;
    id: number;
  };
  instrumentSpec: {
    moduleName: String;
    className: String;
    model: String;
    manufacturer: String;
    type: String;
    id: number;
  };
  warningMsg: String;
  checkExist: Boolean = true;

  constructor(
    private flashMessage: FlashMessagesService,
    private instrumentsService: InstrumentsService) {
      // show all instruments locally
      this.instrumentsService.getInstruments().subscribe(instruments => {
        this.instruments = instruments;
        // console.log(this.instruments);
      });

      // show all instruments remotely
      this.instrumentsService.getremoteInstruments().subscribe(remoteinstruments => {
        this.remoteinstruments = remoteinstruments;
        // console.log(this.remoteinstruments);
      });

      const spec = {
        request: "fireplexCoreDaoRetrieval",
        coreDaoReqData: {
          attrName: "id",
              colNames: ["id"],
              coreDao: {
                id: null,
                  className: "InstrumentSpec",
                  moduleName: "fireplex.data.backend.core"
              },
              dataRange: {},
              loadAll: "true"
            }
      }
      this.instrumentsService.getInstrumentSpecs(spec).subscribe(specs => {
        this.instrumentSpecs = specs.results;
        // console.log(this.instrumentSpecs);
      });
    }

  ngOnInit() {
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

  createInstrument() {
    const remoteCreate = {
      request: "fireplexCoreDaoCreation",
      coreDaoReqData: {
        coreDao: {
          moduleName: "fireplex.data.backend.core",
          short: this.short_add,
          className: "Instrument",
          spec_id: this.spec_id_add,
          id: null
        },
        pKey: "id",
        searchKey: "short"
      }
    }
    const Obj = this;
    this.instrumentsService.createInstrument(remoteCreate).subscribe(res => {
      // console.log(res);
      var newid = res.results[0].id;
      // console.log(newid);
      const localCreate = {
        moduleName: "fireplex.data.backend.core",
        short: this.short_add,
        className: "Instrument",
        spec_id: this.spec_id_add,
        id: newid
      }
      Obj.instrumentsService.addInstrument(localCreate).subscribe(data => {
        if (data.success) {
          Obj.flashMessage.show('Create New Role Successfully!', {cssClass: 'alert-success', timeout: 3000});
          window.location.reload();
        } else {
          Obj.flashMessage.show('Create Role Failed!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }
  searchByShort(short) {
    const shortname = {
      short: short,
    }
    this.instrumentsService.searchInstrumentsByShort(shortname).subscribe(res => {
      // console.log(res[0]);
      if (res[0]) {
        this.warningMsg = 'Role already exists in database!';
        this.checkExist = true;
      } else {
        this.warningMsg = undefined;
        this.checkExist = false;
      }
    });
  }
}
