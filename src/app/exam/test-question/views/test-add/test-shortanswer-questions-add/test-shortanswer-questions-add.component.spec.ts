import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestShortanswerQuestionsAddComponent } from './test-shortanswer-questions-add.component';

describe('TestShortanswerQuestionsAddComponent', () => {
  let component: TestShortanswerQuestionsAddComponent;
  let fixture: ComponentFixture<TestShortanswerQuestionsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestShortanswerQuestionsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestShortanswerQuestionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
