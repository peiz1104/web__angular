import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlanViewComponent } from './trainingplan-view.component';

describe('TrainingPlanViewComponent', () => {
  let component: TrainingPlanViewComponent;
  let fixture: ComponentFixture<TrainingPlanViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPlanViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
