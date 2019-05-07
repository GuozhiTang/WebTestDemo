import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabwarespecsComponent } from './labwarespecs.component';

describe('LabwarespecsComponent', () => {
  let component: LabwarespecsComponent;
  let fixture: ComponentFixture<LabwarespecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabwarespecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabwarespecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
