import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabwareSpec } from '../../../models/LabwareSpec';
import { ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .modal-lg {
    max-width: 1200px !important;
  }
`]
})
export class ModalComponent {
  closeResult: string;
  lwarespecs: LabwareSpec[];

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    ) {
      this.dataService.getData('LabwareSpec').subscribe(lwarespecs => {
        this.lwarespecs = lwarespecs;
      });
    }
  
  /**
   * Method to open the modal
   * @param content the content of the modal
   */
  openLg(content) {
    this.modalService.open(content, { size:'lg', backdrop: 'static', keyboard: false});
  }

}
