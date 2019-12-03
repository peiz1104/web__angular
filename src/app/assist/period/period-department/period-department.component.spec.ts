import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodDepartmentComponent } from './period-department.component';

describe('PeriodDepartmentComponent', () => {
  let component: PeriodDepartmentComponent;
  let fixture: ComponentFixture<PeriodDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
