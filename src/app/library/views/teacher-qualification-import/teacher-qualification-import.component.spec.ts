import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQualificationImportComponent } from './teacher-qualification-import.component';

describe('TeacherQualificationImportComponent', () => {
  let component: TeacherQualificationImportComponent;
  let fixture: ComponentFixture<TeacherQualificationImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherQualificationImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherQualificationImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
