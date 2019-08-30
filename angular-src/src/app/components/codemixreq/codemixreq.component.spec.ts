/*
 * @Description: Code Mix Request
 * @Author: Guozhi Tang
 * @Date: 2019-08-07 16:17:38
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:32:12
 */
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
