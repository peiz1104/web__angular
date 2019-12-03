import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInternalEditComponent } from './teacher-internal-edit.component';

describe('TeacherInternalEditComponent', () => {
  let component: TeacherInternalEditComponent;
  let fixture: ComponentFixture<TeacherInternalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInternalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInternalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
