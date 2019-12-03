import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFulltimeEditComponent } from './teacher-fulltime-edit.component';

describe('TeacherFulltimeEditComponent', () => {
  let component: TeacherFulltimeEditComponent;
  let fixture: ComponentFixture<TeacherFulltimeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFulltimeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFulltimeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
