import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassPerformenceComponent } from './training-class-performence.component';

describe('TrainingClassPerformenceComponent', () => {
  let component: TrainingClassPerformenceComponent;
  let fixture: ComponentFixture<TrainingClassPerformenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassPerformenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassPerformenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
