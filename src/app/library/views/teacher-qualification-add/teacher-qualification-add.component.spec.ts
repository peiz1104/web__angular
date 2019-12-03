import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQualificationAddComponent } from './teacher-qualification-add.component';

describe('TeacherQualificationAddComponent', () => {
  let component: TeacherQualificationAddComponent;
  let fixture: ComponentFixture<TeacherQualificationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherQualificationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQualificationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
