import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExtFromComponent } from './teacher-ext-from.component';

describe('TeacherExtFromComponent', () => {
  let component: TeacherExtFromComponent;
  let fixture: ComponentFixture<TeacherExtFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExtFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExtFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
