import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingOfficeAssessmentComponent } from './training-office-assessment.component';

describe('TrainingOfficeAssessmentComponent', () => {
  let component: TrainingOfficeAssessmentComponent;
  let fixture: ComponentFixture<TrainingOfficeAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingOfficeAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingOfficeAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
