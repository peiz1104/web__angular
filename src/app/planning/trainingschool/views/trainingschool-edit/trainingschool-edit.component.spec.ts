import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSchoolEditComponent } from './trainingschool-edit.component';

describe('TrainingSchoolEditComponent', () => {
  let component: TrainingSchoolEditComponent;
  let fixture: ComponentFixture<TrainingSchoolEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingSchoolEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSchoolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
