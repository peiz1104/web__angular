import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherParttimeComponent } from './teacher-parttime.component';

describe('TeacherParttimeComponent', () => {
  let component: TeacherParttimeComponent;
  let fixture: ComponentFixture<TeacherParttimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherParttimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherParttimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
