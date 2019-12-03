import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMatchingQuestionsEditComponent } from './test-matching-questions-edit.component';

describe('TestMatchingQuestionsEditComponent', () => {
  let component: TestMatchingQuestionsEditComponent;
  let fixture: ComponentFixture<TestMatchingQuestionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMatchingQuestionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMatchingQuestionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
