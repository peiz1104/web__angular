import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassAttendancenewPersonComponent } from './train-class-attendancenew-person.component';

describe('TrainClassAttendancenewPersonComponent', () => {
  let component: TrainClassAttendancenewPersonComponent;
  let fixture: ComponentFixture<TrainClassAttendancenewPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassAttendancenewPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassAttendancenewPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
