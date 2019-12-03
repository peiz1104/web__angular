import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastYearPlanListComponent } from './lastyearplan-list.component';

describe('LastYearPlanListComponent', () => {
  let component: LastYearPlanListComponent;
  let fixture: ComponentFixture<LastYearPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LastYearPlanListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastYearPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
