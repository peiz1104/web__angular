import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingCourseGroupComponent } from './offering-course-group.component';

describe('OfferingCourseGroupComponent', () => {
  let component: OfferingCourseGroupComponent;
  let fixture: ComponentFixture<OfferingCourseGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingCourseGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingCourseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
