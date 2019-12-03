import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenPlanImportComponent } from './childrenplan-import.component';

describe('ChildrenPlanImportComponent', () => {
  let component: ChildrenPlanImportComponent;
  let fixture: ComponentFixture<ChildrenPlanImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenPlanImportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenPlanImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
