/*
 * @Description: Page for some remarks for the web application
 * @Author: Guozhi Tang
 * @Date: 2019-08-15 16:13:19
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:35:54
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarksComponent } from './remarks.component';

describe('RemarksComponent', () => {
  let component: RemarksComponent;
  let fixture: ComponentFixture<RemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
