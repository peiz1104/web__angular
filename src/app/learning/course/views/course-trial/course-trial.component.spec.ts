import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTrialComponent } from './course-trial.component';

describe('CourseTrialComponent', () => {
  let component: CourseTrialComponent;
  let fixture: ComponentFixture<CourseTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
