import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherParttimeImportComponent } from './teacher-parttime-import.component';

describe('TeacherParttimeImportComponent', () => {
  let component: TeacherParttimeImportComponent;
  let fixture: ComponentFixture<TeacherParttimeImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherParttimeImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherParttimeImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
