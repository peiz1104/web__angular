import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectConditionComponent } from './subject-condition.component';

describe('SubjectConditionComponent', () => {
  let component: SubjectConditionComponent;
  let fixture: ComponentFixture<SubjectConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
