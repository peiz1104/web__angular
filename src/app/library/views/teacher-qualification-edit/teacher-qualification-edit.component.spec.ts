import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQualificationEditComponent } from './teacher-qualification-edit.component';

describe('TeacherQualificationEditComponent', () => {
  let component: TeacherQualificationEditComponent;
  let fixture: ComponentFixture<TeacherQualificationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherQualificationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQualificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
