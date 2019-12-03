import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExternalFormComponent } from './teacher-external-form.component';

describe('TeacherExternalFormComponent', () => {
  let component: TeacherExternalFormComponent;
  let fixture: ComponentFixture<TeacherExternalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExternalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExternalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
