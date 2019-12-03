import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTrialPublicComponent } from './course-trial-public.component';

describe('CourseTrialPublicComponent', () => {
  let component: CourseTrialPublicComponent;
  let fixture: ComponentFixture<CourseTrialPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTrialPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTrialPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
