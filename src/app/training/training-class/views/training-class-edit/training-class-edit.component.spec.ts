import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassEditComponent } from './training-class-edit.component';

describe('TrainingClassEditComponent', () => {
  let component: TrainingClassEditComponent;
  let fixture: ComponentFixture<TrainingClassEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
