import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeTeacherDetailComponent } from './office-teacher-detail.component';

describe('OfficeTeacherDetailComponent', () => {
  let component: OfficeTeacherDetailComponent;
  let fixture: ComponentFixture<OfficeTeacherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeTeacherDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeTeacherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
