import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingEnrollmentEnrolledComponent } from './offering-enrollment-enrolled.component';

describe('OfferingEnrollmentEnrolledComponent', () => {
  let component: OfferingEnrollmentEnrolledComponent;
  let fixture: ComponentFixture<OfferingEnrollmentEnrolledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingEnrollmentEnrolledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingEnrollmentEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
