import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassAttendanceComponent } from './train-class-attendance.component';

describe('TrainClassAttendanceComponent', () => {
  let component: TrainClassAttendanceComponent;
  let fixture: ComponentFixture<TrainClassAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
