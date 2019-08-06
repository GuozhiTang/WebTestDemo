import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodedilutionreqComponent } from './codedilutionreq.component';

describe('GenerateworkorderComponent', () => {
  let component: CodedilutionreqComponent;
  let fixture: ComponentFixture<CodedilutionreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodedilutionreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodedilutionreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
