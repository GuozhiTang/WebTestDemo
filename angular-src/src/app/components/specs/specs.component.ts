import { Component, OnInit } from '@angular/core';
import { SpecsService } from '../../services/specs.service';
import { Spec } from '../../../Spec';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';

@Component({
  selector: 'app-specs',
  templateUrl: './specs.component.html',
  styleUrls: ['./specs.component.css']
})
export class SpecsComponent implements OnInit {
  specs: Spec[];
  remotespecs: Spec[];
  className: String;
  moduleName: String;
  description: String;
  name: String;
  id: String;
  searchName: String;
  searchNameRes: Spec[];
  searchModuleNameRes: Spec[];
  searchIdRes: Spec[];
  searchConRes: Spec[];

  constructor(
    private flashMessage: FlashMessagesService,
    private specsService: SpecsService,
    private remoteService: RemotereqService,
    ) {
      this.specsService.getSpecs().subscribe(specs => {
        this.specs = specs;
      });

      const getremoteSpecs = {
        request: "getSpecs"
      }
      this.remoteService.remotePostReq(getremoteSpecs).subscribe(remotespecs => {
        this.remotespecs = remotespecs;
      });
    }

  ngOnInit() {
  }

  onAddSpecs() {
    const spec = {
      className: this.className,
      moduleName: this.moduleName,
      description: this.description,
      name: this.name,
      id: this.id
    }

    // Add Spec
    this.specsService.addSpec(spec).subscribe(data => {
      if (data.success) {
        console.log('Add Successfully!');
      } else {
        console.log('Add Failed!');
      }
    });
  }

  onGrabSpecs() {
    this.specsService.grabSpecs().subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Grab Successfully!', {cssClass: 'alert-success', timeout: 3000});
        console.log('Grab Successfully!');
      } else {
        this.flashMessage.show('Grab Failed!', {cssClass: 'alert-danger', timeout: 3000});
        console.log('Grab Failed!');
      }
    });
  }

  onSearchSpecsByName() {
    // console.log('Test');
    // console.log(this.searchName);
    // const name = this.name;
    // this.specsService.searchSpecs(this.searchName)
    //   .subscribe(res => {
    //     console.log(res.artists.items);
    //   });
    const searchName = {
      name: this.name
    }
    this.specsService.searchSpecsByName(searchName).subscribe(res => {
      this.searchNameRes = res;
    });
  }

  onSearchSpecsByModuleName() {
    const searchModuleName = {
      moduleName: this.moduleName
    }
    this.specsService.searchSpecsByModuleName(searchModuleName).subscribe(res => {
      this.searchModuleNameRes = res;
    });
  }

  onSearchSpecsById() {
    const searchId = {
      id: this.id
    }
    this.specsService.searchSpecsById(searchId).subscribe(res => {
      this.searchIdRes = res;
    });
  }

  onSearchSpecsByConditions() {
    const conditions = {
      name: this.name,
      moduleName: this.moduleName
    }
    this.specsService.searchSpecsByConditions(conditions).subscribe(res => {
      this.searchConRes = res;
    });
  }
}
