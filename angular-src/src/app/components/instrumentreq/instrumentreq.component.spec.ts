import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentreqComponent } from './instrumentreq.component';

describe('InstrumentreqComponent', () => {
  let component: InstrumentreqComponent;
  let fixture: ComponentFixture<InstrumentreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
