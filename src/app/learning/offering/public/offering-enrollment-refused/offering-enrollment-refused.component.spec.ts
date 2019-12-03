import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingEnrollmentRefusedComponent } from './offering-enrollment-refused.component';

describe('OfferingEnrollmentRefusedComponent', () => {
  let component: OfferingEnrollmentRefusedComponent;
  let fixture: ComponentFixture<OfferingEnrollmentRefusedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingEnrollmentRefusedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingEnrollmentRefusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
