import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainBaseInfoComponent } from './train-base-info.component';

describe('TrainBaseInfoComponent', () => {
  let component: TrainBaseInfoComponent;
  let fixture: ComponentFixture<TrainBaseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainBaseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
