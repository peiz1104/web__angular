import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPapersBoxComponent } from './review-papers-box.component';

describe('ReviewPapersBoxComponent', () => {
  let component: ReviewPapersBoxComponent;
  let fixture: ComponentFixture<ReviewPapersBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPapersBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPapersBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
