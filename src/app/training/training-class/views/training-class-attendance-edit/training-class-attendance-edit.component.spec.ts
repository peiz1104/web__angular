import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassAttendanceEditComponent } from './training-class-attendance-edit.component';

describe('TrainingClassAttendanceEditComponent', () => {
  let component: TrainingClassAttendanceEditComponent;
  let fixture: ComponentFixture<TrainingClassAttendanceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassAttendanceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassAttendanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
