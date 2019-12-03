import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExternalEditComponent } from './teacher-external-edit.component';

describe('TeacherExternalEditComponent', () => {
  let component: TeacherExternalEditComponent;
  let fixture: ComponentFixture<TeacherExternalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExternalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExternalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
