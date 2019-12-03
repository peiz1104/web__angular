import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassResultsComponent } from './training-class-results.component';

describe('TrainingClassResultsComponent', () => {
  let component: TrainingClassResultsComponent;
  let fixture: ComponentFixture<TrainingClassResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
