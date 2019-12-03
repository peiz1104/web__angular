import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeAddComponent } from './question-type-add.component';

describe('QuestionTypeAddComponent', () => {
  let component: QuestionTypeAddComponent;
  let fixture: ComponentFixture<QuestionTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
