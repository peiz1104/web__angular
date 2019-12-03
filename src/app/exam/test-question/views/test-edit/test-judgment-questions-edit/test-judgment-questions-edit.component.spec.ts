import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestJudgmentQuestionsEditComponent } from './test-judgment-questions-edit.component';

describe('TestJudgmentQuestionsEditComponent', () => {
  let component: TestJudgmentQuestionsEditComponent;
  let fixture: ComponentFixture<TestJudgmentQuestionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestJudgmentQuestionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestJudgmentQuestionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
