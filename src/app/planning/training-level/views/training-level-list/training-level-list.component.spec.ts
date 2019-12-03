import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLevelListComponent } from './training-level-list.component';

describe('TrainingLevelListComponent', () => {
  let component: TrainingLevelListComponent;
  let fixture: ComponentFixture<TrainingLevelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingLevelListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
