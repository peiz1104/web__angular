import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChoiceQuestionsAddComponent } from './test-choice-questions-add.component';

describe('TestChoiceQuestionsAddComponent', () => {
  let component: TestChoiceQuestionsAddComponent;
  let fixture: ComponentFixture<TestChoiceQuestionsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestChoiceQuestionsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChoiceQuestionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
