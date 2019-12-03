import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassSurveyComponent } from './training-class-survey.component';

describe('TrainingClassSurveyComponent', () => {
  let component: TrainingClassSurveyComponent;
  let fixture: ComponentFixture<TrainingClassSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
