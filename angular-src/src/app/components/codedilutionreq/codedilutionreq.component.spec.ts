/*
 * @Description: The Code Dilution Request
 * @Author: Guozhi Tang
 * @Date: 2019-08-06 15:18:55
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:32:02
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodedilutionreqComponent } from './codedilutionreq.component';

describe('GenerateworkorderComponent', () => {
  let component: CodedilutionreqComponent;
  let fixture: ComponentFixture<CodedilutionreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodedilutionreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodedilutionreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
