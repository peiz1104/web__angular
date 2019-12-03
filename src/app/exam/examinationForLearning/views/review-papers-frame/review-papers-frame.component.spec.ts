import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPapersFrameComponent } from './review-papers-frame.component';

describe('ReviewPapersFrameComponent', () => {
  let component: ReviewPapersFrameComponent;
  let fixture: ComponentFixture<ReviewPapersFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPapersFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPapersFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
