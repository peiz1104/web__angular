import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLevelAddComponent } from './training-level-add.component';

describe('TrainingLevelAddComponent', () => {
  let component: TrainingLevelAddComponent;
  let fixture: ComponentFixture<TrainingLevelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingLevelAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingLevelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
