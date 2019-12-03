import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassAttendanceComponent } from './training-class-attendance.component';

describe('TrainingClassAttendanceComponent', () => {
  let component: TrainingClassAttendanceComponent;
  let fixture: ComponentFixture<TrainingClassAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
