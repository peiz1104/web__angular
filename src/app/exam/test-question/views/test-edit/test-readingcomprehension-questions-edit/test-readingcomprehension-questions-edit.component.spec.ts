import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReadingcomprehensionQuestionsEditComponent } from './test-readingcomprehension-questions-edit.component';

describe('TestReadingcomprehensionQuestionsEditComponent', () => {
  let component: TestReadingcomprehensionQuestionsEditComponent;
  let fixture: ComponentFixture<TestReadingcomprehensionQuestionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestReadingcomprehensionQuestionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReadingcomprehensionQuestionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
