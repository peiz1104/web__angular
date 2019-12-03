import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassCourseForumComponent } from './training-class-course-forum.component';

describe('TrainingClassCourseForumComponent', () => {
  let component: TrainingClassCourseForumComponent;
  let fixture: ComponentFixture<TrainingClassCourseForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassCourseForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassCourseForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
