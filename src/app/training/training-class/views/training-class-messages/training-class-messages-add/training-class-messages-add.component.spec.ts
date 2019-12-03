import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassMessagesAddComponent } from './training-class-messages-add.component';

describe('TrainingClassMessagesAddComponent', () => {
  let component: TrainingClassMessagesAddComponent;
  let fixture: ComponentFixture<TrainingClassMessagesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassMessagesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassMessagesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
