import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExtendAddComponent } from './teacher-extend-add.component';

describe('TeacherExtendAddComponent', () => {
  let component: TeacherExtendAddComponent;
  let fixture: ComponentFixture<TeacherExtendAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExtendAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExtendAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
