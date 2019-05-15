import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabwareSpec } from '../../../LabwareSpec';
import { LabwarespecsService } from '../../services/labwarespecs.service';
import { ViewEncapsulation } from '@angular/core';

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
    private labwarespecsService: LabwarespecsService,
    ) {
      this.labwarespecsService.getLabwareSpecs().subscribe(lwarespecs => {
        this.lwarespecs = lwarespecs;
      });
    }

  openLg(content) {
    this.modalService.open(content, { size:'lg', backdrop: 'static', keyboard: false});
  }

}
