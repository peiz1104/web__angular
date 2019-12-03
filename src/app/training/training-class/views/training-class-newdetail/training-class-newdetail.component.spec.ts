import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassNewdetailComponent } from './training-class-newdetail.component';

describe('TrainingClassNewdetailComponent', () => {
  let component: TrainingClassNewdetailComponent;
  let fixture: ComponentFixture<TrainingClassNewdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassNewdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassNewdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
