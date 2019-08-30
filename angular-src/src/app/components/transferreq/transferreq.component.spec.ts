/*
 * @Description: The transfer request
 * @Author: Guozhi Tang
 * @Date: 2019-08-14 12:29:22
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-14 12:29:22
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferreqComponent } from './transferreq.component';

describe('TransferreqComponent', () => {
  let component: TransferreqComponent;
  let fixture: ComponentFixture<TransferreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
