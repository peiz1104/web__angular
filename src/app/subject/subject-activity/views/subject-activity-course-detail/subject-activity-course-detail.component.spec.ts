import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityCourseDetailComponent } from './subject-activity-course-detail.component';

describe('SubjectActivityCourseDetailComponent', () => {
  let component: SubjectActivityCourseDetailComponent;
  let fixture: ComponentFixture<SubjectActivityCourseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityCourseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
