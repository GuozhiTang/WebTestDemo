import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatelistComponent } from './platelist.component';

describe('PlatelistComponent', () => {
  let component: PlatelistComponent;
  let fixture: ComponentFixture<PlatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
