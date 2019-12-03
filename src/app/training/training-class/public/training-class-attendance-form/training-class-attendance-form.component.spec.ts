import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassAttendanceFormComponent } from './training-class-attendance-form.component';

describe('TrainingClassAttendanceFormComponent', () => {
  let component: TrainingClassAttendanceFormComponent;
  let fixture: ComponentFixture<TrainingClassAttendanceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassAttendanceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassAttendanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
