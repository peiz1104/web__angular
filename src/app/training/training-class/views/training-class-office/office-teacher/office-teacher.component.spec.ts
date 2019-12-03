import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeTeacherComponent } from './office-teacher.component';

describe('OfficeTeacherComponent', () => {
  let component: OfficeTeacherComponent;
  let fixture: ComponentFixture<OfficeTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
