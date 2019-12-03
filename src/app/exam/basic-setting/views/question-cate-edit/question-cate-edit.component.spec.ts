import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCateEditComponent } from './question-cate-edit.component';

describe('QuestionCateEditComponent', () => {
  let component: QuestionCateEditComponent;
  let fixture: ComponentFixture<QuestionCateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
