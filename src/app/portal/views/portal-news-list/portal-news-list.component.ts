import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PortalNewsViewComponent } from './../portal-news-view/portal-news-view.component';
import { NzModalService } from 'ng-zorro-antd';
import { NewsArticleApiService } from './../../service/news-article-api.service';
import { NewsGroupApiService } from './../../service/news-group-api.service';
import { Column } from 'console-ui-ng';
import { NewsArticle } from './../../entity/news-article';
import { NewsGroup } from './../../entity/news-group';
import { Component, OnInit } from '@angular/core';
import { CuiPagination } from 'console-ui-ng';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-portal-news-list',
    templateUrl: './portal-news-list.component.html',
    styleUrls: ['./portal-news-list.component.scss']
})
export class PortalNewsListComponent implements OnInit {

    groups: NewsGroup[];
    groupSlected: NewsGroup;
    selectedIndex: number = 0;
    articles: CuiPagination;
    selection: NewsArticle[];
    loading: boolean;
    isFirst: boolean;

    columns: Column[] = [
        { title: '标题', tpl: 'title' },
        { title: '作者', data: 'author' },
        { title: '有效期', tpl: 'period' },
        { title: '创建人', data: 'createdByDisplayName' },
        { title: '创建时间', tpl: 'createdDate' },
        { title: '状态', tpl: 'status' },
        { title: '置顶', tpl: 'toTop' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];

    _searchForm: FormGroup;

    constructor(private groupApi: NewsGroupApiService, private articleApi: NewsArticleApiService,
        private modal: NzModalService, private fb: FormBuilder,
        private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let groupId: number = +this.route.snapshot.queryParamMap.get("groupId");

        this.groupApi.getAll().subscribe(
            groups => {
                this.groups = groups;
                this.groups.push({ name: "未分组", displayOrder: 1000 });
                this.groups.sort((a, b) => a.displayOrder - b.displayOrder);
                if (groups && groups.length > 0) {
                    this.groupSlected = groups.find(it => it.id == groupId) || groups[0];
                    this.selectedIndex = this.groups.findIndex(it => it.id == groupId) || 0;
                    this.isFirst = true;
                    this.loadData();
                }
            }
        );
        this.initForm();
    }

    initForm() {
        this._searchForm = this.fb.group({
            title: [],
            author: [],
            isPublished: []
        });
    }

    addArticles() {
        this.router.navigate(['add'], { relativeTo: this.route, queryParams: { groupId: this.groupSlected.id } });
    }

    showPeriod(row) {
        let periodStr = '';
        let startDateStr = this.formatDate(row.startDate);
        let endDateStr = this.formatDate(row.endDate);
        if (startDateStr && endDateStr) {
            periodStr = startDateStr + "~" + endDateStr;
        } else if (startDateStr) {
            periodStr = startDateStr + "~永久";
        } else if (endDateStr) {
            periodStr = "到" + endDateStr + "截至";
        } else {
            periodStr = "永久";
        }

        return periodStr;
    }

    formatDate(timestamp) {
        let date = new Date(timestamp);
        return timestamp ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : '';
    }

    loadData(page?: CuiPagination) {
        this.articles = page;
        let params = this._searchForm.value;
        for (let key of Object.keys(params)) {
            params[key] = params[key] || '';
        }
        params['newsGroupId'] = (this.groupSlected ? this.groupSlected.id : 0)
            || (this.groups && this.groups.length > 0 ? this.groups[0].id : 0);

        if (!this.groupSlected.id) {
            params['newsGroupId'] = 0;
        }
        this.loading = true;
        if (params['isPublished'] == 2) {
            params['isPublished'] = 0;
        }
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        this.articleApi.getAllOfPage(params).subscribe(
            data => {
                console.log(data, 666666666666)
                this.articles = data;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    search() {
        this.loadData();
    }

    _tabChange(tab) {
        if (this.isFirst) {
            this.isFirst = false;
            return;
        } else {
            let index = tab.index;
            this.groupSlected = this.groups && this.groups.length > index ? this.groups[index] : null;
            this.loadData();
        }

    }
    newTab() {

    }

    preview(article: NewsArticle) {
        const subscription = this.modal.open({
            title: `${article.title} > 预览`,
            content: PortalNewsViewComponent,
            zIndex: 1003,
            onOk() {
            },
            onCancel() {
            },
            footer: false,
            maskClosable: false,
            width: 960,
            componentParams: {
                article: article
            }
        });
    }

    publish(articleId?: NewsArticle, flag?: boolean) {
        if (!articleId && (!this.selection || this.selection.length == 0)) {
            tipMessage('请选择要发布的项');
            return;
        }
        let ids = articleId ? [articleId] : this.selection.map(it => it.id);
        if (flag) {
            this.modal.confirm({
                title: `确定要发布选择的新闻资讯吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.articleApi.publish(ids).subscribe(
                        ok => {
                            tipMessage('发布成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage('发布失败');
                        }
                    )
                }
            });
        } else {
            this.articleApi.publish(ids).subscribe(
                ok => {
                    tipMessage('发布成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('发布失败');
                }
            )
        }


    }
    disPublish(articleId?: NewsArticle, flag?: boolean) {
        if (!articleId && (!this.selection || this.selection.length == 0)) {
            tipMessage('请选择要取消发布的项');
            return;
        }
        let ids = articleId ? [articleId] : this.selection.map(it => it.id);
        if (flag) {
            this.modal.confirm({
                title: `确定要撤销发布选择的新闻资讯吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.articleApi.disPublish(ids).subscribe(
                        ok => {
                            tipMessage('取消发布成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage('取消发布失败');
                        }
                    )
                }
            });
        } else {
            this.articleApi.disPublish(ids).subscribe(
                ok => {
                    tipMessage('撤销发布成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('撤销发布失败');
                }
            )
        }

    }
    delete(articleId?: NewsArticle, flag?: boolean) {
        if (!articleId && (!this.selection || this.selection.length == 0)) {
            tipMessage('请选择要删除的项', 'warning');
            return;
        }

        let ids = articleId ? [articleId] : this.selection.map(it => it.id);
        if (flag) {
            this.modal.confirm({
                title: `确定要删除选择的新闻资讯吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.articleApi.delete(ids).subscribe(
                        ok => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage('删除失败');
                        }
                    )
                }
            });
        } else {
            this.articleApi.delete(ids).subscribe(
                ok => {
                    tipMessage('删除成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('删除失败');
                }
            )
        }
    }

    // 置顶、取消置顶
    top(articleId: number, flag?: boolean) {
        if (flag) {// 置顶
            this.articleApi.toTop(articleId).subscribe(
                ok => {
                    tipMessage('置顶成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('置顶失败');
                }
            )
        } else {// 取消置顶
            this.articleApi.cancelTop(articleId).subscribe(
                ok => {
                    tipMessage('取消置顶成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('取消置顶失败');
                }
            )
        }

    }
}
