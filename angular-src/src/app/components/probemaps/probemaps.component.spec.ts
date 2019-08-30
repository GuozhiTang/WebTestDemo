/*
 * @Description: To show the probemaps data in data server and local database
 * @Author: Guozhi Tang
 * @Date: 2019-05-08 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:19:21
 */
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
