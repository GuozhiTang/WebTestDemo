/*
 * @Description: The page to show labwarespecs data in data server and local database
 * @Author: Guozhi Tang
 * @Date: 2019-05-07 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:33:39
 */
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
