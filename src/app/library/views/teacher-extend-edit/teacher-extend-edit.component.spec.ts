import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExtendEditComponent } from './teacher-extend-edit.component';

describe('TeacherExtendEditComponent', () => {
  let component: TeacherExtendEditComponent;
  let fixture: ComponentFixture<TeacherExtendEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExtendEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExtendEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
