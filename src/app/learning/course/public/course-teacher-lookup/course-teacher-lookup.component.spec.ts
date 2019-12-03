import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeacherLookupComponent } from './course-teacher-lookup.component';

describe('CourseTeacherLookupComponent', () => {
  let component: CourseTeacherLookupComponent;
  let fixture: ComponentFixture<CourseTeacherLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTeacherLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTeacherLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
