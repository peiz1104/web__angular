import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInternalAddComponent } from './teacher-internal-add.component';

describe('TeacherInternalAddComponent', () => {
  let component: TeacherInternalAddComponent;
  let fixture: ComponentFixture<TeacherInternalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInternalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInternalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
