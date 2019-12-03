import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTrialFormComponent } from './course-trial-form.component';

describe('CourseTrialComponent', () => {
  let component: CourseTrialFormComponent;
  let fixture: ComponentFixture<CourseTrialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTrialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTrialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
