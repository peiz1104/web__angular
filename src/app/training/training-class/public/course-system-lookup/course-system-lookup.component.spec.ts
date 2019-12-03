import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSystemLookupComponent } from './course-system-lookup.component';

describe('CourseSystemLookupComponent', () => {
  let component: CourseSystemLookupComponent;
  let fixture: ComponentFixture<CourseSystemLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSystemLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSystemLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
