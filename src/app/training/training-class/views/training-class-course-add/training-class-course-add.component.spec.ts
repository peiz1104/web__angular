import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassCourseAddComponent } from './training-class-course-add.component';

describe('TrainingClassCourseAddComponent', () => {
  let component: TrainingClassCourseAddComponent;
  let fixture: ComponentFixture<TrainingClassCourseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassCourseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassCourseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
