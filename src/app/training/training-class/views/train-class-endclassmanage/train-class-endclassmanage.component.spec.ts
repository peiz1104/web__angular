import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassEndclassmanageComponent } from './train-class-endclassmanage.component';

describe('TrainClassEndclassmanageComponent', () => {
  let component: TrainClassEndclassmanageComponent;
  let fixture: ComponentFixture<TrainClassEndclassmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassEndclassmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassEndclassmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
