import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeListComponent } from './question-type-list.component';

describe('QuestionTypeListComponent', () => {
  let component: QuestionTypeListComponent;
  let fixture: ComponentFixture<QuestionTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
