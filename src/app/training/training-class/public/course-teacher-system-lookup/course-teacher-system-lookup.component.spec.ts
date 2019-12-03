import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeacherSystemLookupComponent } from './course-teacher-system-lookup.component';

describe('CourseTeacherSystemLookupComponent', () => {
  let component: CourseTeacherSystemLookupComponent;
  let fixture: ComponentFixture<CourseTeacherSystemLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTeacherSystemLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTeacherSystemLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
