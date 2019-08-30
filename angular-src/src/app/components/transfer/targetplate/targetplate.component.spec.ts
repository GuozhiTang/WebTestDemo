/*
 * @Description: The target plate of a transfe request in test version mainly for testing the drag and drop plate model. It is not used for now.
 * @Author: Guozhi Tang
 * @Date: 2019-04-22 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:22:11
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetplateComponent } from './targetplate.component';

describe('TargetplateComponent', () => {
  let component: TargetplateComponent;
  let fixture: ComponentFixture<TargetplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
