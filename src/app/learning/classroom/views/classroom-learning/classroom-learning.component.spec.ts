import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomLearningComponent } from './classroom-learning.component';

describe('ClassroomLearningComponent', () => {
  let component: ClassroomLearningComponent;
  let fixture: ComponentFixture<ClassroomLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
