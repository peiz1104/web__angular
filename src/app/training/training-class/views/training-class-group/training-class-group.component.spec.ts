import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassGroupComponent } from './training-class-group.component';

describe('TrainingClassGroupComponent', () => {
  let component: TrainingClassGroupComponent;
  let fixture: ComponentFixture<TrainingClassGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
