import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExtendFormComponent } from './teacher-extend-form.component';

describe('TeacherExtendFormComponent', () => {
  let component: TeacherExtendFormComponent;
  let fixture: ComponentFixture<TeacherExtendFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExtendFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExtendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
