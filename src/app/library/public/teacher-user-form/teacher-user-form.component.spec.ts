import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUserFormComponent } from './teacher-user-form.component';

describe('TeacherUserFormComponent', () => {
  let component: TeacherUserFormComponent;
  let fixture: ComponentFixture<TeacherUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
