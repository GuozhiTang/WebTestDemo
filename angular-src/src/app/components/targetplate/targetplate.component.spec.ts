import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetplateComponent } from './targetplate.component';

describe('TargetplateComponent', () => {
  let component: TargetplateComponent;
  let fixture: ComponentFixture<TargetplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
