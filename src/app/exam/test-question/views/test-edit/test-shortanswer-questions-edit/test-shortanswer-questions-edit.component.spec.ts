import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestShortanswerQuestionsEditComponent } from './test-shortanswer-questions-edit.component';

describe('TestShortanswerQuestionsEditComponent', () => {
  let component: TestShortanswerQuestionsEditComponent;
  let fixture: ComponentFixture<TestShortanswerQuestionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestShortanswerQuestionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestShortanswerQuestionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
