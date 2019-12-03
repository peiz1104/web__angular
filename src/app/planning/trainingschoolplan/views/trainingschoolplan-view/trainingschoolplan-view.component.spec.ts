import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSchoolPlanViewComponent } from './trainingschoolplan-view.component';

describe('TrainingSchoolPlanViewComponent', () => {
  let component: TrainingSchoolPlanViewComponent;
  let fixture: ComponentFixture<TrainingSchoolPlanViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingSchoolPlanViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSchoolPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
