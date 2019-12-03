import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompletionQuestionsAddComponent } from './test-completion-questions-add.component';

describe('TestCompletionQuestionsAddComponent', () => {
  let component: TestCompletionQuestionsAddComponent;
  let fixture: ComponentFixture<TestCompletionQuestionsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCompletionQuestionsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCompletionQuestionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
