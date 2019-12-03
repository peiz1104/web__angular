import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSchoolListComponent } from './trainingschool-list.component';

describe('TrainingSchoolListComponent', () => {
  let component: TrainingSchoolListComponent;
  let fixture: ComponentFixture<TrainingSchoolListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingSchoolListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSchoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
