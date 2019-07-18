import { TestBed } from '@angular/core/testing';

import { RemotereqService } from './remotereq.service';

describe('RemotereqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemotereqService = TestBed.get(RemotereqService);
    expect(service).toBeTruthy();
  });
});
