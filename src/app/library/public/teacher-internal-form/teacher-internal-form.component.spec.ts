import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInternalFormComponent } from './teacher-internal-form.component';

describe('TeacherInternalFormComponent', () => {
  let component: TeacherInternalFormComponent;
  let fixture: ComponentFixture<TeacherInternalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInternalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInternalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
