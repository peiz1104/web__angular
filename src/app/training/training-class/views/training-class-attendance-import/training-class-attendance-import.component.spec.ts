import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassAttendanceImportComponent } from './training-class-attendance-import.component';

describe('TrainingClassAttendanceImportComponent', () => {
  let component: TrainingClassAttendanceImportComponent;
  let fixture: ComponentFixture<TrainingClassAttendanceImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassAttendanceImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassAttendanceImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
