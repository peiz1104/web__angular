import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassListComponent } from './training-class-list.component';

describe('TrainingClassListComponent', () => {
  let component: TrainingClassListComponent;
  let fixture: ComponentFixture<TrainingClassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
