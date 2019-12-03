import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlanImportComponent } from './trainingplan-import.component';

describe('TrainingPlanImportComponent', () => {
  let component: TrainingPlanImportComponent;
  let fixture: ComponentFixture<TrainingPlanImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPlanImportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPlanImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
