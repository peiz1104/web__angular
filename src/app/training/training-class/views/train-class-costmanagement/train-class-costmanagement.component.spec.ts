import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassCostmanagementComponent } from './train-class-costmanagement.component';

describe('TrainClassCostmanagementComponent', () => {
  let component: TrainClassCostmanagementComponent;
  let fixture: ComponentFixture<TrainClassCostmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassCostmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassCostmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
