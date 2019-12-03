import { NewsArticle } from './../../entity/news-article';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NewsArticleApiService } from './../../service/news-article-api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-portal-news-edit',
  templateUrl: './portal-news-edit.component.html',
  styleUrls: ['./portal-news-edit.component.scss']
})
export class PortalNewsEditComponent implements OnInit {

  article: NewsArticle;
  loading: boolean = false;
  groupId: number;
  constructor(private router: Router, private route: ActivatedRoute,
    private articleApi: NewsArticleApiService, private message: NzMessageService) { }

  ngOnInit() {
    let articleId: number = +this.route.snapshot.paramMap.get('articleId');
    if (!articleId) {
      this.toList();
      return;
    }
    this.route.queryParams.subscribe(
      ({ groupId }) => {
        this.groupId = +groupId;
    });

    this.articleApi.getOne(articleId).subscribe(
      article => {
        this.article = article;
        this.groupId = this.groupId ? this.groupId : article.newsGroupId;
      }
    );
  }

  onSave(event) {
    this.loading = true;
    let value = event.value;
    value['id'] = this.article.id;
    value['newsGroup'] = value['newsGroupId'] ? { id: value['newsGroupId'] } : null;
    this.groupId = value['newsGroupId'];
    this.articleApi.update(value).subscribe(
      ok => {
        this.loading = false;
        tipMessage('保存成功', 'success');
        this.toList();
      },
      err => {
        this.loading = false;
        tipMessage('保存失败');
      }
    );
  }

  onCancel(event) {
    this.toList();
  }

  toList() {
    this.router.navigate(['../../'], { relativeTo: this.route, queryParams: { groupId: this.groupId } });
  }

}
