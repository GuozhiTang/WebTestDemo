import { TestBed } from '@angular/core/testing';

import { SpecsService } from './specs.service';

describe('SpecsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecsService = TestBed.get(SpecsService);
    expect(service).toBeTruthy();
  });
});
