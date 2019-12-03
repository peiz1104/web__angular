import { TestBed, inject } from '@angular/core/testing';

import { TypeManagementService } from './type-management.service';

describe('TypeManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeManagementService]
    });
  });

  it('should be created', inject([TypeManagementService], (service: TypeManagementService) => {
    expect(service).toBeTruthy();
  }));
});
