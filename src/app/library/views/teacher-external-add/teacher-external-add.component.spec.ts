import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExternalAddComponent } from './teacher-external-add.component';

describe('TeacherExternalAddComponent', () => {
  let component: TeacherExternalAddComponent;
  let fixture: ComponentFixture<TeacherExternalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExternalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExternalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
