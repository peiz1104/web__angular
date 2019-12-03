import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInnerFormComponent } from './teacher-inner-form.component';

describe('TeacherInnerFormComponent', () => {
  let component: TeacherInnerFormComponent;
  let fixture: ComponentFixture<TeacherInnerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInnerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
