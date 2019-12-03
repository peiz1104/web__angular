import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingschoolplanListComponent } from './trainingschoolplan-list.component';

describe('TrainingschoolplanListComponent', () => {
  let component: TrainingschoolplanListComponent;
  let fixture: ComponentFixture<TrainingschoolplanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingschoolplanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingschoolplanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
