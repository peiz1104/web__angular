import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainClassCourselistComponent } from './train-class-courselist.component';

describe('TrainClassCourselistComponent', () => {
  let component: TrainClassCourselistComponent;
  let fixture: ComponentFixture<TrainClassCourselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainClassCourselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainClassCourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
