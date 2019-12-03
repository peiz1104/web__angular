import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAssessmentComponent } from './training-assessment.component';

describe('TrainingAssessmentComponent', () => {
  let component: TrainingAssessmentComponent;
  let fixture: ComponentFixture<TrainingAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
