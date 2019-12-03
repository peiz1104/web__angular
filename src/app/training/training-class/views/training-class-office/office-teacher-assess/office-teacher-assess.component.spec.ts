import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeTeacherAssessComponent } from './office-teacher-assess.component';

describe('OfficeTeacherAssessComponent', () => {
  let component: OfficeTeacherAssessComponent;
  let fixture: ComponentFixture<OfficeTeacherAssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeTeacherAssessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeTeacherAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
