import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSchoolAddComponent } from './trainingschool-add.component';

describe('TrainingSchoolAddComponent', () => {
  let component: TrainingSchoolAddComponent;
  let fixture: ComponentFixture<TrainingSchoolAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingSchoolAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSchoolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
