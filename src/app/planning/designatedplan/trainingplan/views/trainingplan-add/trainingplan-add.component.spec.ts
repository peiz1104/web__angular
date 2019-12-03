import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlanAddComponent } from './trainingplan-add.component';

describe('TrainingPlanAddComponent', () => {
  let component: TrainingPlanAddComponent;
  let fixture: ComponentFixture<TrainingPlanAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPlanAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPlanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
