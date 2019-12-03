import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassEnrollmentComponent } from './training-class-enrollment.component';

describe('TrainingClassEnrollmentComponent', () => {
  let component: TrainingClassEnrollmentComponent;
  let fixture: ComponentFixture<TrainingClassEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
