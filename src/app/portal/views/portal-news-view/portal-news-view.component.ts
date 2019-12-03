import { NewsArticle } from './../../entity/news-article';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spk-portal-news-view',
  templateUrl: './portal-news-view.component.html',
  styleUrls: ['./portal-news-view.component.scss']
})
export class PortalNewsViewComponent implements OnInit {

  @Input() article: NewsArticle;

  constructor() { }

  ngOnInit() {
  }

  publishedDate() {
    return this.article.publishedDate || this.article.createdDate || Date();
  }

  get viewCount() {
    // return this.article.viewCount || Math.floor(Math.random() * 10);
    return this.article.viewCount || 0;
  }

}
