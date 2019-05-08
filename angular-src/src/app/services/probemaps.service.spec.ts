import { TestBed } from '@angular/core/testing';

import { ProbemapsService } from './probemaps.service';

describe('ProbemapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProbemapsService = TestBed.get(ProbemapsService);
    expect(service).toBeTruthy();
  });
});
