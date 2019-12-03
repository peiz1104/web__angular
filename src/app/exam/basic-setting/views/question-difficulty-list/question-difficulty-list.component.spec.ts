import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDifficultyListComponent } from './question-difficulty-list.component';

describe('QuestionDifficultyListComponent', () => {
  let component: QuestionDifficultyListComponent;
  let fixture: ComponentFixture<QuestionDifficultyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDifficultyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDifficultyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
