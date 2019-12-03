import { PortalNewsViewComponent } from './../../views/portal-news-view/portal-news-view.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsArticle } from './../../entity/news-article';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewsGroupApiService } from 'app/portal/service/news-group-api.service';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-news-article-form',
    templateUrl: './news-article-form.component.html',
    styleUrls: ['./news-article-form.component.scss']
})
export class NewsArticleFormComponent implements OnInit {

    @Input() article: NewsArticle;
    @Input() loading: boolean;
    @Input() groupId: number;

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    _form: FormGroup;

    _groups: any[];

    thumbnail: string;

    _startDate = null;
    _endDate = null;

    constructor(private fb: FormBuilder, private message: NzMessageService,
        private modal: NzModalService, private groupApi: NewsGroupApiService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        let m = this.article || new NewsArticle();
        this.thumbnail = m.thumbnail;
        this._form = this.fb.group({
            id: [m.id],
            title: [m.title, Validators.required],
            author: [m.author],
            keywords: [m.keywords],
            thumbnail: [m.thumbnail],
            summary: [m.summary],
            content: [m.content],
            flags: [m.flags],
            startDate: [m.startDate],
            endDate: [m.endDate],
            newsGroupId: [m.newsGroupId],
            isPublished: [m.isPublished],
            viewCount: [m.viewCount],
        });
        if (!m.id && this.groupId) {
            this._form.get('newsGroupId').setValue(this.groupId);
        }
    }

    getFormControl(name) {
        return this._form.controls[name];
    }

    markAsDirty() {
        for (let key of Object.keys(this._form.controls)) {
            this._form.controls[key].markAsDirty();
        }
    }

    _save(event) {
        this.markAsDirty();

        if (this._form.invalid) {
            // TODO: show helpful info
            tipMessage('表单填写有误，请根据提示修改后重试', 'warning');
            return;
        }

        this.save.emit({ originalEvent: event, value: this._form.value });
    }

    _cancel(event) {
        this.cancel.emit({ originalEvent: event });
    }

    onImageUpload(event) {
        this._form.value.thumbnail = event[0].relativePath;
    }

    preview() {
        let article: NewsArticle = { title: '', author: '', createdDate: null, viewCount: 0, content: '', summary: '' };
        for (let key of Object.keys(article)) {
            console.log(this._form.controls[key])
            article[key] = this._form.controls[key] ? this._form.controls[key].value : (this.article ? this.article[key] : null);
        }

        const subscription = this.modal.open({
            title: `${article.title} > 预览`,
            content: PortalNewsViewComponent,
            footer: false,
            maskClosable: false,
            width: 960,
            zIndex: 1003,
            componentParams: {
                article: article
            }
        });
    }


    // 日期控件
    newArray = (len) => {
        const result = [];
        for (let i = 0; i < len; i++) {
            result.push(i);
        }
        return result;
    };
    _startValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return false;
        }
        return startValue.getTime() >= this._endDate.getTime();
    };
    _disabledEndDate = (endValue) => {
        this._startDate = new Date(this._startDate)
        if (!endValue || !this._startDate) {
            return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
    };
    get _isSameDay() {
        return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day')
    }
    get _endTime() {
        return {
            nzHideDisabledOptions: true,
            nzDisabledHours: () => {
                return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
            },
            nzDisabledMinutes: (h) => {
                if (this._isSameDay && h === this._startDate.getHours()) {
                    return this.newArray(this._startDate.getMinutes());
                }
                return [];
            },
            nzDisabledSeconds: (h, m) => {
                if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
                    return this.newArray(this._startDate.getSeconds());
                }
                return [];
            }
        }
    }
}
