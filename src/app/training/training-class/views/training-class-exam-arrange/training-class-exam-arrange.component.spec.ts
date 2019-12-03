import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassExamArrangeComponent } from './training-class-exam-arrange.component';

describe('TrainingClassExamArrangeComponent', () => {
  let component: TrainingClassExamArrangeComponent;
  let fixture: ComponentFixture<TrainingClassExamArrangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassExamArrangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassExamArrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
