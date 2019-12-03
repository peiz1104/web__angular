import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeacherImportComponent } from './user-teacher-import.component';

describe('UserTeacherImportComponent', () => {
  let component: UserTeacherImportComponent;
  let fixture: ComponentFixture<UserTeacherImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTeacherImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeacherImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
