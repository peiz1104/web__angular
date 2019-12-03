import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassEvaluationComponent } from './train-class-evaluation.component';

describe('TrainClassEvaluationComponent', () => {
  let component: TrainClassEvaluationComponent;
  let fixture: ComponentFixture<TrainClassEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
