import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChoiceQuestionsEditComponent } from './test-choice-questions-edit.component';

describe('TestChoiceQuestionsEditComponent', () => {
  let component: TestChoiceQuestionsEditComponent;
  let fixture: ComponentFixture<TestChoiceQuestionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestChoiceQuestionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChoiceQuestionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
