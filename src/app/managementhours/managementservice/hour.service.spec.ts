import { TestBed, inject } from '@angular/core/testing';

import { HourService } from './hour.service';

describe('HourService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HourService]
    });
  });

  it('should be created', inject([HourService], (service: HourService) => {
    expect(service).toBeTruthy();
  }));
});
