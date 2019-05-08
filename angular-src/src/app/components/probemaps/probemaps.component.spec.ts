import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbemapsComponent } from './probemaps.component';

describe('ProbemapsComponent', () => {
  let component: ProbemapsComponent;
  let fixture: ComponentFixture<ProbemapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbemapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbemapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
