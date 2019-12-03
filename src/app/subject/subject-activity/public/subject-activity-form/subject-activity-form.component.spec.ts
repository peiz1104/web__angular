import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityFormComponent } from './subject-activity-form.component';

describe('SubjectActivityFormComponent', () => {
  let component: SubjectActivityFormComponent;
  let fixture: ComponentFixture<SubjectActivityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
