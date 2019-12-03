import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStrategyNewComponent } from './course-strategy-new.component';

describe('CourseStrategyNewComponent', () => {
  let component: CourseStrategyNewComponent;
  let fixture: ComponentFixture<CourseStrategyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseStrategyNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStrategyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
