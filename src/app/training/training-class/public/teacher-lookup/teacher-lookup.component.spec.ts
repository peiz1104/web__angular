import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLookupComponent } from './teacher-lookup.component';

describe('TeacherLookupComponent', () => {
  let component: TeacherLookupComponent;
  let fixture: ComponentFixture<TeacherLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
