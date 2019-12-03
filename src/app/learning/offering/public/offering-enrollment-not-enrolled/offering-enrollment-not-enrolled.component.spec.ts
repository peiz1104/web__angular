import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingEnrollmentNotEnrolledComponent } from './offering-enrollment-not-enrolled.component';

describe('OfferingEnrollmentNotEnrolledComponent', () => {
  let component: OfferingEnrollmentNotEnrolledComponent;
  let fixture: ComponentFixture<OfferingEnrollmentNotEnrolledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingEnrollmentNotEnrolledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingEnrollmentNotEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
