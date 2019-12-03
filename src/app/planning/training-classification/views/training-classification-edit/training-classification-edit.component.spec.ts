import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassificationEditComponent } from './training-classification-edit.component';

describe('TrainingClassificationEditComponent', () => {
  let component: TrainingClassificationEditComponent;
  let fixture: ComponentFixture<TrainingClassificationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingClassificationEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
