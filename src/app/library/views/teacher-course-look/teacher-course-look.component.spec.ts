import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseLookComponent } from './teacher-course-look.component';

describe('TeacherCourseLookComponent', () => {
  let component: TeacherCourseLookComponent;
  let fixture: ComponentFixture<TeacherCourseLookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCourseLookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCourseLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
