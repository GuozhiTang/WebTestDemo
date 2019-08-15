import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixtubecarrierreqComponent } from './matrixtubecarrierreq.component';

describe('SignUpFormComponent', () => {
  let component: MatrixtubecarrierreqComponent;
  let fixture: ComponentFixture<MatrixtubecarrierreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixtubecarrierreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixtubecarrierreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
