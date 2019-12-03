import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassificationAddComponent } from './training-classification-add.component';

describe('TrainingClassificationAddComponent', () => {
  let component: TrainingClassificationAddComponent;
  let fixture: ComponentFixture<TrainingClassificationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingClassificationAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassificationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
