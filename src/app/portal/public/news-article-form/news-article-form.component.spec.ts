import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArticleFormComponent } from './news-article-form.component';

describe('NewsArticleFormComponent', () => {
  let component: NewsArticleFormComponent;
  let fixture: ComponentFixture<NewsArticleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsArticleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
