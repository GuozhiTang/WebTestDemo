import { TestBed } from '@angular/core/testing';

import { PlateService } from './plate.service';

describe('PlateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlateService = TestBed.get(PlateService);
    expect(service).toBeTruthy();
  });
});
