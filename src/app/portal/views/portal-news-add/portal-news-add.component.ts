import { NzMessageService } from 'ng-zorro-antd';
import { NewsArticleApiService } from './../../service/news-article-api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NewsArticle } from '../../entity/news-article';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-portal-news-add',
  templateUrl: './portal-news-add.component.html',
  styleUrls: ['./portal-news-add.component.scss']
})
export class PortalNewsAddComponent implements OnInit {

  loading: boolean = false;
  groupId: number;
  constructor(private router: Router, private route: ActivatedRoute,
    private articleApi: NewsArticleApiService, private message: NzMessageService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      ({groupId}) => {
        this.groupId = +groupId;
      });
  }

  onSave(event) {
    this.loading = true;
    let value = event.value;
    value['newsGroup'] = value['newsGroupId'] ? { id: value['newsGroupId'] } : null;

    this.articleApi.create(value).subscribe(
      ok => {
        this.loading = false;
        tipMessage('添加文章成功', 'success');
        this.toList();
      },
      err => {
        this.loading = false;
        tipMessage('添加文章失败');
      }
    );
  }

  onCancel(event) {
    this.toList();
  }

  toList() {
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: { groupId: this.groupId }  });
  }
}
