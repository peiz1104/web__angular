import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassMessagesInfoComponent } from './training-class-messages-info.component';

describe('TrainingClassMessagesInfoComponent', () => {
  let component: TrainingClassMessagesInfoComponent;
  let fixture: ComponentFixture<TrainingClassMessagesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassMessagesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassMessagesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
