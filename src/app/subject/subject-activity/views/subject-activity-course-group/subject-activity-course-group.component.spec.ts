import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityCourseGroupComponent } from './subject-activity-course-group.component';

describe('SubjectActivityCourseGroupComponent', () => {
  let component: SubjectActivityCourseGroupComponent;
  let fixture: ComponentFixture<SubjectActivityCourseGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityCourseGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityCourseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
