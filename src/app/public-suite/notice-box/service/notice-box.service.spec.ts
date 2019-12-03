import { TestBed, inject } from '@angular/core/testing';

import { NoticeBoxService } from './notice-box.service';

describe('NoticeBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoticeBoxService]
    });
  });

  it('should be created', inject([NoticeBoxService], (service: NoticeBoxService) => {
    expect(service).toBeTruthy();
  }));
});
