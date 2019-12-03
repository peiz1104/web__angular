import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgcActivityMessagesPersonsComponent } from './ugc-activity-messages-persons.component';

describe('UgcActivityMessagesPersonsComponent', () => {
  let component: UgcActivityMessagesPersonsComponent;
  let fixture: ComponentFixture<UgcActivityMessagesPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UgcActivityMessagesPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgcActivityMessagesPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
