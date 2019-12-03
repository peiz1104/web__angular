import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherGrantComponent } from './teacher-grant.component';

describe('TeacherGrantComponent', () => {
  let component: TeacherGrantComponent;
  let fixture: ComponentFixture<TeacherGrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherGrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
