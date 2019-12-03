import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOutlineComponent } from './course-outline.component';

describe('CourseOutlineComponent', () => {
  let component: CourseOutlineComponent;
  let fixture: ComponentFixture<CourseOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
