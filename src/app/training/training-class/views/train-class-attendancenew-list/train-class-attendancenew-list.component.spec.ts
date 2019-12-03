import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassAttendancenewListComponent } from './train-class-attendancenew-list.component';

describe('TrainClassAttendancenewListComponent', () => {
  let component: TrainClassAttendancenewListComponent;
  let fixture: ComponentFixture<TrainClassAttendancenewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassAttendancenewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassAttendancenewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
