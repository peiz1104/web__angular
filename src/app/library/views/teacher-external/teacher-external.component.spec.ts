import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExternalComponent } from './teacher-external.component';

describe('TeacherExternalComponent', () => {
  let component: TeacherExternalComponent;
  let fixture: ComponentFixture<TeacherExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
