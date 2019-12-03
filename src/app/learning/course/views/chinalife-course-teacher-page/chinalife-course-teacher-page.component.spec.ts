import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinalifeCourseTeacherPageComponent } from './chinalife-course-teacher-page.component';

describe('ChinalifeCourseTeacherPageComponent', () => {
  let component: ChinalifeCourseTeacherPageComponent;
  let fixture: ComponentFixture<ChinalifeCourseTeacherPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinalifeCourseTeacherPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinalifeCourseTeacherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
