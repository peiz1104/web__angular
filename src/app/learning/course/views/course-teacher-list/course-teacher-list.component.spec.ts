import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeacherListComponent } from './course-teacher-list.component';

describe('CourseTeacherListComponent', () => {
  let component: CourseTeacherListComponent;
  let fixture: ComponentFixture<CourseTeacherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTeacherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTeacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
