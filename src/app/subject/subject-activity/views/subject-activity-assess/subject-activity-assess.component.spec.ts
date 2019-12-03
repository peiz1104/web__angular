import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivityAssessComponent } from './subject-activity-assess.component';

describe('SubjectActivityAssessComponent', () => {
  let component: SubjectActivityAssessComponent;
  let fixture: ComponentFixture<SubjectActivityAssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectActivityAssessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectActivityAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
