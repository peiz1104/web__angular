import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReadingcomprehensionQuestionsListComponent } from './test-readingcomprehension-questions-list.component';

describe('TestReadingcomprehensionQuestionsListComponent', () => {
  let component: TestReadingcomprehensionQuestionsListComponent;
  let fixture: ComponentFixture<TestReadingcomprehensionQuestionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestReadingcomprehensionQuestionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReadingcomprehensionQuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
