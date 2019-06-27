import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixtubecarrierComponent } from './matrixtubecarrier.component';

describe('SignUpFormComponent', () => {
  let component: MatrixtubecarrierComponent;
  let fixture: ComponentFixture<MatrixtubecarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixtubecarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixtubecarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
