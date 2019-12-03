import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassAssessComponent } from './training-class-assess.component';

describe('TrainingClassAssessComponent', () => {
  let component: TrainingClassAssessComponent;
  let fixture: ComponentFixture<TrainingClassAssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassAssessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
