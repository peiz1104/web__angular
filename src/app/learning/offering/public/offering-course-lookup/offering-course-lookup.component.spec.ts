import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingCourseLookupComponent } from './offering-course-lookup.component';

describe('OfferingCourseLookupComponent', () => {
  let component: OfferingCourseLookupComponent;
  let fixture: ComponentFixture<OfferingCourseLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingCourseLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingCourseLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
