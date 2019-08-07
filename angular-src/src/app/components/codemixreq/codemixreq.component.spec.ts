import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodemixreqComponent } from './codemixreq.component';

describe('CodemixreqComponent', () => {
  let component: CodemixreqComponent;
  let fixture: ComponentFixture<CodemixreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodemixreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodemixreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
