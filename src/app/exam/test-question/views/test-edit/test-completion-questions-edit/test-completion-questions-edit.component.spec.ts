import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompletionQuestionsEditComponent } from './test-completion-questions-edit.component';

describe('TestCompletionQuestionsEditComponent', () => {
  let component: TestCompletionQuestionsEditComponent;
  let fixture: ComponentFixture<TestCompletionQuestionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCompletionQuestionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCompletionQuestionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
