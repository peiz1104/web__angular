import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomCourseComponent } from './classroom-course.component';

describe('ClassroomCourseComponent', () => {
  let component: ClassroomCourseComponent;
  let fixture: ComponentFixture<ClassroomCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
