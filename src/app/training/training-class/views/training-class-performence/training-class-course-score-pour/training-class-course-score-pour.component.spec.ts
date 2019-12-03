import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassCourseScorePourComponent } from './training-class-course-score-pour.component';

describe('TrainingClassCourseScorePourComponent', () => {
  let component: TrainingClassCourseScorePourComponent;
  let fixture: ComponentFixture<TrainingClassCourseScorePourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassCourseScorePourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassCourseScorePourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
