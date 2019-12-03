import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignatedPlanListComponent } from './designatedplan-list.component';

describe('AnnualplanListComponent', () => {
  let component: DesignatedPlanListComponent;
  let fixture: ComponentFixture<DesignatedPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DesignatedPlanListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignatedPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
