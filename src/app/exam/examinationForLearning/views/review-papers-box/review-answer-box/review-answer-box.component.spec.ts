import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAnswerBoxComponent } from './review-answer-box.component';

describe('ReviewAnswerBoxComponent', () => {
  let component: ReviewAnswerBoxComponent;
  let fixture: ComponentFixture<ReviewAnswerBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAnswerBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAnswerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
