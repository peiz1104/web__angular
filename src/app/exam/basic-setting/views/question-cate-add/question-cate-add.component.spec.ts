import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCateAddComponent } from './question-cate-add.component';

describe('QuestionCateAddComponent', () => {
  let component: QuestionCateAddComponent;
  let fixture: ComponentFixture<QuestionCateAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCateAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
