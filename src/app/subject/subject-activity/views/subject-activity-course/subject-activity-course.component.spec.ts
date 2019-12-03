import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityCourseComponent } from './subject-activity-course.component';

describe('SubjectActivityCourseComponent', () => {
  let component: SubjectActivityCourseComponent;
  let fixture: ComponentFixture<SubjectActivityCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
