import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassAttendancelistComponent } from './train-class-attendancelist.component';

describe('TrainClassAttendancelistComponent', () => {
  let component: TrainClassAttendancelistComponent;
  let fixture: ComponentFixture<TrainClassAttendancelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassAttendancelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassAttendancelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
