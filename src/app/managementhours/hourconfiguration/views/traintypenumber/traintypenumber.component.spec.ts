import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraintypenumberComponent } from './traintypenumber.component';

describe('TraintypenumberComponent', () => {
  let component: TraintypenumberComponent;
  let fixture: ComponentFixture<TraintypenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraintypenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraintypenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
