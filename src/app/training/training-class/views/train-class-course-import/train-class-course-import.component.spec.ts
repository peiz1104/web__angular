import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassCourseImportComponent } from './train-class-course-import.component';

describe('TrainClassCourseImportComponent', () => {
  let component: TrainClassCourseImportComponent;
  let fixture: ComponentFixture<TrainClassCourseImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassCourseImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassCourseImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
