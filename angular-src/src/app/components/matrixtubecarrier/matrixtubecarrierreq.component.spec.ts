/*
 * @Description: The matrix tube carrier request page
 * @Author: Guozhi Tang
 * @Date: 2019-08-15 16:13:19
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-15 16:13:19
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixtubecarrierreqComponent } from './matrixtubecarrierreq.component';

describe('SignUpFormComponent', () => {
  let component: MatrixtubecarrierreqComponent;
  let fixture: ComponentFixture<MatrixtubecarrierreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixtubecarrierreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixtubecarrierreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
