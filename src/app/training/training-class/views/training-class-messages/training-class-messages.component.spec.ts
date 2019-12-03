import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassMessagesComponent } from './training-class-messages.component';

describe('TrainingClassMessagesComponent', () => {
  let component: TrainingClassMessagesComponent;
  let fixture: ComponentFixture<TrainingClassMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
