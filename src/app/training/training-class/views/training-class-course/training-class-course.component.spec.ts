import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassCourseComponent } from './training-class-course.component';

describe('TrainingClassCourseComponent', () => {
  let component: TrainingClassCourseComponent;
  let fixture: ComponentFixture<TrainingClassCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
