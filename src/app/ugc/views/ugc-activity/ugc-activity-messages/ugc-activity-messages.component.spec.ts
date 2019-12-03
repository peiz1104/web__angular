import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgcActivityMessagesComponent } from './ugc-activity-messages.component';

describe('UgcActivityMessagesComponent', () => {
  let component: UgcActivityMessagesComponent;
  let fixture: ComponentFixture<UgcActivityMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UgcActivityMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgcActivityMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
