import { TestBed, inject } from '@angular/core/testing';

import { MessageReceiveConfigService } from './message-receive-config.service';

describe('MessageReceiveConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageReceiveConfigService]
    });
  });

  it('should be created', inject([MessageReceiveConfigService], (service: MessageReceiveConfigService) => {
    expect(service).toBeTruthy();
  }));
});
