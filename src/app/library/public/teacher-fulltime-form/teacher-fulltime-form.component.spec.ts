import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFulltimeFormComponent } from './teacher-fulltime-form.component';

describe('TeacherFulltimeFormComponent', () => {
  let component: TeacherFulltimeFormComponent;
  let fixture: ComponentFixture<TeacherFulltimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFulltimeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFulltimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
