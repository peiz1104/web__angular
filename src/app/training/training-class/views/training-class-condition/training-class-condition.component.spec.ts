import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassConditionComponent } from './training-class-condition.component';

describe('TrainingClassConditionComponent', () => {
  let component: TrainingClassConditionComponent;
  let fixture: ComponentFixture<TrainingClassConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
