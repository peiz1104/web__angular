import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCateListComponent } from './question-cate-list.component';

describe('QuestionCateListComponent', () => {
  let component: QuestionCateListComponent;
  let fixture: ComponentFixture<QuestionCateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
