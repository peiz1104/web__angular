import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassAddComponent } from './training-class-add.component';

describe('TrainingClassAddComponent', () => {
  let component: TrainingClassAddComponent;
  let fixture: ComponentFixture<TrainingClassAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
