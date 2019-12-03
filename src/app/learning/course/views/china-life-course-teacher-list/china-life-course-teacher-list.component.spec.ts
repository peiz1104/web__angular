import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinaLifeCourseTeacherListComponent } from './china-life-course-teacher-list.component';

describe('ChinaLifeCourseTeacherListComponent', () => {
  let component: ChinaLifeCourseTeacherListComponent;
  let fixture: ComponentFixture<ChinaLifeCourseTeacherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinaLifeCourseTeacherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinaLifeCourseTeacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
