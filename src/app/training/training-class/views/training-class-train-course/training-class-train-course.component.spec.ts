import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassTrainCourseComponent } from './training-class-train-course.component';

describe('TrainingClassTrainCourseComponent', () => {
  let component: TrainingClassTrainCourseComponent;
  let fixture: ComponentFixture<TrainingClassTrainCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassTrainCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassTrainCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
