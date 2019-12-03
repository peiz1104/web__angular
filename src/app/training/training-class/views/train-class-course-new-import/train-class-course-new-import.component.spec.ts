import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassCourseNewImportComponent } from './train-class-course-new-import.component';

describe('TrainClassCourseNewImportComponent', () => {
  let component: TrainClassCourseNewImportComponent;
  let fixture: ComponentFixture<TrainClassCourseNewImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassCourseNewImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassCourseNewImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
