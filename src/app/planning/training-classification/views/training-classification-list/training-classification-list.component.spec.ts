import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassificationListComponent } from './training-classification-list.component';

describe('TrainingClassificationListComponent', () => {
  let component: TrainingClassificationListComponent;
  let fixture: ComponentFixture<TrainingClassificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingClassificationListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
