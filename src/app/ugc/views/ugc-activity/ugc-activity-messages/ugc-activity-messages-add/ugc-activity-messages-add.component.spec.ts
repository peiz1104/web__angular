import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgcActivityMessagesAddComponent } from './ugc-activity-messages-add.component';

describe('UgcActivityMessagesAddComponent', () => {
  let component: UgcActivityMessagesAddComponent;
  let fixture: ComponentFixture<UgcActivityMessagesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UgcActivityMessagesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgcActivityMessagesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
