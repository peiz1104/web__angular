import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassPourComponent } from './training-class-pour.component';

describe('TrainingClassPourComponent', () => {
  let component: TrainingClassPourComponent;
  let fixture: ComponentFixture<TrainingClassPourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassPourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassPourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
