import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlanCopyComponent } from './lastyearplan-list.component';

describe('LastYearPlanListComponent', () => {
  let component: TrainingPlanCopyComponent;
  let fixture: ComponentFixture<TrainingPlanCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPlanCopyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPlanCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
