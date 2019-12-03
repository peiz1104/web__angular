import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingEnrollmentComponent } from './offering-enrollment.component';

describe('OfferingEnrollmentComponent', () => {
  let component: OfferingEnrollmentComponent;
  let fixture: ComponentFixture<OfferingEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
