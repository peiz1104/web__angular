import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassScoreStrategyComponent } from './training-class-score-strategy.component';

describe('TrainingClassScoreStrategyComponent', () => {
  let component: TrainingClassScoreStrategyComponent;
  let fixture: ComponentFixture<TrainingClassScoreStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassScoreStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassScoreStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
