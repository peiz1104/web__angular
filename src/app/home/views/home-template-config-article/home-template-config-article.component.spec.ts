import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTemplateConfigArticleComponent } from './home-template-config-article.component';

describe('HomeTemplateConfigArticleComponent', () => {
  let component: HomeTemplateConfigArticleComponent;
  let fixture: ComponentFixture<HomeTemplateConfigArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTemplateConfigArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTemplateConfigArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
