import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStrategyComponent } from './course-strategy.component';

describe('CourseStrategyComponent', () => {
  let component: CourseStrategyComponent;
  let fixture: ComponentFixture<CourseStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
