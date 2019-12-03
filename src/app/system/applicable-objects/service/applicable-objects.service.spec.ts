import { TestBed, inject } from '@angular/core/testing';

import { ApplicableObjectsService } from './applicable-objects.service';

describe('ApplicableObjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicableObjectsService]
    });
  });

  it('should be created', inject([ApplicableObjectsService], (service: ApplicableObjectsService) => {
    expect(service).toBeTruthy();
  }));
});
