import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodAuditingComponent } from './period-auditing.component';

describe('PeriodAuditingComponent', () => {
  let component: PeriodAuditingComponent;
  let fixture: ComponentFixture<PeriodAuditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodAuditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodAuditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
