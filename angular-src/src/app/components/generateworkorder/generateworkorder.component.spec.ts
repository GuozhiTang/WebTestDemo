import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateworkorderComponent } from './generateworkorder.component';

describe('GenerateworkorderComponent', () => {
  let component: GenerateworkorderComponent;
  let fixture: ComponentFixture<GenerateworkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateworkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateworkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
