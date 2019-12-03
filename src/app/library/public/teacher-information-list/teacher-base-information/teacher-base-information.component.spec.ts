import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBaseInformationComponent } from './teacher-base-information.component';

describe('TeacherBaseInformationComponent', () => {
  let component: TeacherBaseInformationComponent;
  let fixture: ComponentFixture<TeacherBaseInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherBaseInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherBaseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
