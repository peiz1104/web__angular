import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInformationListComponent } from './teacher-information-list.component';

describe('TeacherInformationListComponent', () => {
  let component: TeacherInformationListComponent;
  let fixture: ComponentFixture<TeacherInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInformationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
