/*
 * @Description: The remote request server is to handle all the requests for remote data server
 * @Author: Guozhi Tang
 * @Date: 2019-07-19 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:39:17
 */
import { TestBed } from '@angular/core/testing';

import { RemotereqService } from './remotereq.service';

describe('RemotereqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemotereqService = TestBed.get(RemotereqService);
    expect(service).toBeTruthy();
  });
});
