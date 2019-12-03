import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingClassCourseDetailComponent } from './training-class-course-detail.component';

describe('TrainingClassCourseDetailComponent', () => {
  let component: TrainingClassCourseDetailComponent;
  let fixture: ComponentFixture<TrainingClassCourseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingClassCourseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingClassCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
