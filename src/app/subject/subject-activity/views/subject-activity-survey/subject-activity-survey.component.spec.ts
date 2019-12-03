import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivitySurveyComponent } from './subject-activity-survey.component';

describe('SubjectActivitySurveyComponent', () => {
  let component: SubjectActivitySurveyComponent;
  let fixture: ComponentFixture<SubjectActivitySurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivitySurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivitySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
