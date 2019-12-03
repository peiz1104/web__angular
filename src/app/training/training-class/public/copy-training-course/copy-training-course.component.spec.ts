import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyTrainingCourseComponent } from './copy-training-course.component';

describe('CopyTrainingCourseComponent', () => {
  let component: CopyTrainingCourseComponent;
  let fixture: ComponentFixture<CopyTrainingCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyTrainingCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyTrainingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
