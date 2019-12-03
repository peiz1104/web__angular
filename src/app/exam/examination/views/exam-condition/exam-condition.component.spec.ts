import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamConditionComponent } from './exam-condition.component';

describe('ExamConditionComponent', () => {
  let component: ExamConditionComponent;
  let fixture: ComponentFixture<ExamConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
