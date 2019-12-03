import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherParttimeFormComponent } from './teacher-parttime-form.component';

describe('TeacherParttimeFormComponent', () => {
  let component: TeacherParttimeFormComponent;
  let fixture: ComponentFixture<TeacherParttimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherParttimeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherParttimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
