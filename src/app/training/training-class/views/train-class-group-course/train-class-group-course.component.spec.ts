import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassGroupCourseComponent } from './train-class-group-course.component';

describe('TrainClassGroupCourseComponent', () => {
  let component: TrainClassGroupCourseComponent;
  let fixture: ComponentFixture<TrainClassGroupCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassGroupCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassGroupCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
