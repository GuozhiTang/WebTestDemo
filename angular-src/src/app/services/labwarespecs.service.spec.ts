import { TestBed } from '@angular/core/testing';

import { LabwarespecsService } from './labwarespecs.service';

describe('LabwarespecsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabwarespecsService = TestBed.get(LabwarespecsService);
    expect(service).toBeTruthy();
  });
});
