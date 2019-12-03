import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassAssessmentComponent } from './train-class-assessment.component';

describe('TrainClassAssessmentComponent', () => {
  let component: TrainClassAssessmentComponent;
  let fixture: ComponentFixture<TrainClassAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
