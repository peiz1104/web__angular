import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainLocationLookComponent } from './train-location-look.component';

describe('TrainLocationLookComponent', () => {
  let component: TrainLocationLookComponent;
  let fixture: ComponentFixture<TrainLocationLookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainLocationLookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainLocationLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
