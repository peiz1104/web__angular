import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraintypenameComponent } from './traintypename.component';

describe('TraintypenameComponent', () => {
  let component: TraintypenameComponent;
  let fixture: ComponentFixture<TraintypenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraintypenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraintypenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
