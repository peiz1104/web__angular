import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeacherNewComponent } from './course-teacher-new.component';

describe('CourseTeacherNewComponent', () => {
  let component: CourseTeacherNewComponent;
  let fixture: ComponentFixture<CourseTeacherNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTeacherNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTeacherNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
