import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReadingcomprehensionQuestionsAddComponent } from './test-readingcomprehension-questions-add.component';

describe('TestReadingcomprehensionQuestionsAddComponent', () => {
  let component: TestReadingcomprehensionQuestionsAddComponent;
  let fixture: ComponentFixture<TestReadingcomprehensionQuestionsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestReadingcomprehensionQuestionsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReadingcomprehensionQuestionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
