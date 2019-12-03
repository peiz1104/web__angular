import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityCourseForumComponent } from './subject-activity-course-forum.component';

describe('SubjectActivityCourseForumComponent', () => {
  let component: SubjectActivityCourseForumComponent;
  let fixture: ComponentFixture<SubjectActivityCourseForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityCourseForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityCourseForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
