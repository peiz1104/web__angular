import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassFormComponent } from './training-class-form.component';

describe('TrainingClassFormComponent', () => {
  let component: TrainingClassFormComponent;
  let fixture: ComponentFixture<TrainingClassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
