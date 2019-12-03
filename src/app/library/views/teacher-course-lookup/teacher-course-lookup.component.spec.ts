import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseLookupComponent } from './teacher-course-lookup.component';

describe('TeacherCourseLookupComponent', () => {
  let component: TeacherCourseLookupComponent;
  let fixture: ComponentFixture<TeacherCourseLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCourseLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCourseLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
