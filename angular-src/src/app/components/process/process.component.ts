import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  instruments: String[] = ['Hamilton RBT1', 'Manual'];
  workorders: String[] = ['Code Mix Request', 'Code Dilution Request', 'Transfer Request', 'Cytometer Setup Kit Request', 'HCI Setup Kit Request', 'Particle Coding Request', 'Assay Request'];
  protocols: String[] = ['HT Immunoassay Conjugation V1-2-With-Tips Short'];

  constructor() { }

  ngOnInit() {
  }

}
