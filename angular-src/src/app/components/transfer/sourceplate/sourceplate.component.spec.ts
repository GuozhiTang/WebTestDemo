import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceplateComponent } from './sourceplate.component';

describe('SourceplateComponent', () => {
  let component: SourceplateComponent;
  let fixture: ComponentFixture<SourceplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
