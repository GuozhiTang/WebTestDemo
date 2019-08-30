/*
 * @Description: The source plate of a transfe request in test version mainly for testing the drag and drop plate model. It is not used for now.
 * @Author: Guozhi Tang
 * @Date: 2019-04-22 14:00:28
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:22:24
 */
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
