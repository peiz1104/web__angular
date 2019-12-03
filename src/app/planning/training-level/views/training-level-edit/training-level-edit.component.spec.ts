import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLevelEditComponent } from './training-level-edit.component';

describe('TrainingLevelEditComponent', () => {
  let component: TrainingLevelEditComponent;
  let fixture: ComponentFixture<TrainingLevelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingLevelEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingLevelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
