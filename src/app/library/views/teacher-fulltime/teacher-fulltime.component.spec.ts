import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFulltimeComponent } from './teacher-fulltime.component';

describe('TeacherFulltimeComponent', () => {
  let component: TeacherFulltimeComponent;
  let fixture: ComponentFixture<TeacherFulltimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFulltimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFulltimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
