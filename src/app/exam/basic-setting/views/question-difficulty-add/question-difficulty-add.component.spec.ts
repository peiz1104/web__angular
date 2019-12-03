import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDifficultyAddComponent } from './question-difficulty-add.component';

describe('QuestionDifficultyAddComponent', () => {
  let component: QuestionDifficultyAddComponent;
  let fixture: ComponentFixture<QuestionDifficultyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDifficultyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDifficultyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
