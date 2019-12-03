import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherParttimeAddComponent } from './teacher-parttime-add.component';

describe('TeacherParttimeAddComponent', () => {
  let component: TeacherParttimeAddComponent;
  let fixture: ComponentFixture<TeacherParttimeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherParttimeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherParttimeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
