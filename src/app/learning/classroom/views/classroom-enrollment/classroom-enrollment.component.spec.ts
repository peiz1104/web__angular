import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomEnrollmentComponent } from './classroom-enrollment.component';

describe('ClassroomEnrollmentComponent', () => {
  let component: ClassroomEnrollmentComponent;
  let fixture: ComponentFixture<ClassroomEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
