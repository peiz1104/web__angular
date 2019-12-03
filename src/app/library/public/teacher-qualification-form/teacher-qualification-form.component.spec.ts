import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQualificationFormComponent } from './teacher-qualification-form.component';

describe('TeacherQualificationFormComponent', () => {
  let component: TeacherQualificationFormComponent;
  let fixture: ComponentFixture<TeacherQualificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherQualificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQualificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
