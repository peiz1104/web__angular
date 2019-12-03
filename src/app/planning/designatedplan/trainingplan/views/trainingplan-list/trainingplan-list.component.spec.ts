import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlanListComponent } from './trainingplan-list.component';

describe('TrainingPlanListComponent', () => {
  let component: TrainingPlanListComponent;
  let fixture: ComponentFixture<TrainingPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPlanListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
