import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourDepartmentComponent } from './hour-department.component';

describe('HourDepartmentComponent', () => {
  let component: HourDepartmentComponent;
  let fixture: ComponentFixture<HourDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
