import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestJudgmentQuestionsAddComponent } from './test-judgment-questions-add.component';

describe('TestJudgmentQuestionsAddComponent', () => {
  let component: TestJudgmentQuestionsAddComponent;
  let fixture: ComponentFixture<TestJudgmentQuestionsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestJudgmentQuestionsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestJudgmentQuestionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
