import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassMessagesPersonsComponent } from './training-class-messages-persons.component';

describe('TrainingClassMessagesPersonsComponent', () => {
  let component: TrainingClassMessagesPersonsComponent;
  let fixture: ComponentFixture<TrainingClassMessagesPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassMessagesPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassMessagesPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
