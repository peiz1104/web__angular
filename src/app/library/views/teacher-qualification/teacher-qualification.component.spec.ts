import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQualificationComponent } from './teacher-qualification.component';

describe('TeacherQualificationComponent', () => {
  let component: TeacherQualificationComponent;
  let fixture: ComponentFixture<TeacherQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
