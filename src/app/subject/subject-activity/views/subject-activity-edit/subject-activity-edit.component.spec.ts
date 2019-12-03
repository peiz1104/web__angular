import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityEditComponent } from './subject-activity-edit.component';

describe('SubjectActivityEditComponent', () => {
  let component: SubjectActivityEditComponent;
  let fixture: ComponentFixture<SubjectActivityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
