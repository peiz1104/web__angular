import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMatchingQuestionsAddComponent } from './test-matching-questions-add.component';

describe('TestMatchingQuestionsAddComponent', () => {
  let component: TestMatchingQuestionsAddComponent;
  let fixture: ComponentFixture<TestMatchingQuestionsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMatchingQuestionsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMatchingQuestionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
