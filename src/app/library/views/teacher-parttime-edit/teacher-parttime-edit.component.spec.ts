import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherParttimeEditComponent } from './teacher-parttime-edit.component';

describe('TeacherParttimeEditComponent', () => {
  let component: TeacherParttimeEditComponent;
  let fixture: ComponentFixture<TeacherParttimeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherParttimeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherParttimeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
