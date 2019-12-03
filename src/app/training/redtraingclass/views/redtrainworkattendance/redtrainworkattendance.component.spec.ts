import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedtrainworkattendanceComponent } from './redtrainworkattendance.component';

describe('RedtrainworkattendanceComponent', () => {
  let component: RedtrainworkattendanceComponent;
  let fixture: ComponentFixture<RedtrainworkattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedtrainworkattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedtrainworkattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
