import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenPlanExportComponent } from './childrenplan-export.component';

describe('ChildrenPlanExportComponent', () => {
  let component: ChildrenPlanExportComponent;
  let fixture: ComponentFixture<ChildrenPlanExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenPlanExportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenPlanExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
