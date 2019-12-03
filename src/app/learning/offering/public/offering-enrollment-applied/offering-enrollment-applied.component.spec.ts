import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingEnrollmentAppliedComponent } from './offering-enrollment-applied.component';

describe('OfferingEnrollmentAppliedComponent', () => {
  let component: OfferingEnrollmentAppliedComponent;
  let fixture: ComponentFixture<OfferingEnrollmentAppliedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingEnrollmentAppliedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingEnrollmentAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
