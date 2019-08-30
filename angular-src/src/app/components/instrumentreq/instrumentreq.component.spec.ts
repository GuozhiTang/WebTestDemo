/*
 * @Description: The Instrument Request
 * @Author: Guozhi Tang
 * @Date: 2019-08-14 12:29:22
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:33:03
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentreqComponent } from './instrumentreq.component';

describe('InstrumentreqComponent', () => {
  let component: InstrumentreqComponent;
  let fixture: ComponentFixture<InstrumentreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
