import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlanEditComponent } from './trainingplan-edit.component';

describe('TrainingPlanEditComponent', () => {
  let component: TrainingPlanEditComponent;
  let fixture: ComponentFixture<TrainingPlanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPlanEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
