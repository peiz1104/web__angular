import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateColumnArticleComponent } from './home-template-column-article.component';

describe('HomeTemplateColumnArticleComponent', () => {
  let component: HomeTemplateColumnArticleComponent;
  let fixture: ComponentFixture<HomeTemplateColumnArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateColumnArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateColumnArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
