import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-config-article',
    templateUrl: './home-template-config-article.component.html',
    styleUrls: ['./home-template-config-article.component.scss']
})
export class HomeTemplateConfigArticleComponent implements OnInit, OnChanges {

    @Input() id?: number;
    @Output() back = new EventEmitter<any>();
    @Output() refresh = new EventEmitter<any>();
    columns;
    isVisible = false;
    isConfirmLoading = false;
    loading = true;
    moduleInfo: any;
    articleInfo: any = [];
    templateId: number; // 模板id
    validateForm: FormGroup;
    saveLoading: boolean = false;

    searchtext;
    newsGroup?: any; // 新闻组列表
    selected: number;

    constructor(
        private fb: FormBuilder,
        private templateService: HomeTemplateApiService,
        private route: ActivatedRoute
    ) {
        this.columns = [
            { title: '名称', data: 'name' },
            { title: '编码', data: 'code' }
        ];
    }

    ngOnInit() {
    }
    ngOnChanges() {
        this.route.params.subscribe(
            (params: Params) => {
                this.templateId = params['id'] as number;
            }
        );
        this.templateService.configInfoAll.forEach(e => {
            if (e.id == this.id) {
                this.moduleInfo = e;
                this.articleInfo = e.itemInfo ? e.itemInfo : [];
            }
        });
        // this.selected = this.articleInfo[0].newsGroupId;
        this.initForm();
    }
    initForm() {
        let m = this.moduleInfo || {};
        this.validateForm = this.fb.group({
            id: [m && m.id],
            moduleType: [m && m.moduleType || 'ARTICLE'],
            layout: { id: this.templateId },
            displayOrder: m && m.displayOrder,
            name: [m && m.name, [Validators.required], this.trimAsyncValidator],
            moreArticle: [m && m.moreArticle || false, [Validators.required]],
            layoutModuleObject: [m && m.layoutModuleObject],
        });
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    trimAsyncValidator = (control: FormControl): any => {
        return Observable.create(function (observer) {
            if (control.value.trim() == '') {
                observer.next({ required: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };

    // 加载新闻组
    loadData() {
        this.loading = true;
        let params = {
            name: this.searchtext
        };
        this.templateService.getNewsGroup(1, params).subscribe(
            pag => {
                this.loading = false;
                this.newsGroup = pag;
                this.newsGroup.sort((a, b) => a.displayOrder > b.displayOrder);
            }
        );
    }

    onSelect(selId) {
        if (selId) {
            this.selected = selId[0];
        }
    }

    // 选择新闻组
    selectNewsGroup() {
        this.loadData();
        this.isVisible = true;
    };

    // 文章确定
    handleOk(e) {
        if (this.selected) {
            this.isConfirmLoading = true;
            this.isVisible = false;
            this.isConfirmLoading = false;
            this.templateService.getNewsArticles(this.selected).subscribe(
                pag => {
                    this.articleInfo = pag.content;
                }
            );
        } else {
            tipMessage('请至少选择一项');
        }
    };

    // 取消弹层
    handleCancel(e) {
        this.isVisible = false;
    };
    // 保存
    save() {
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }
        if (this.validateForm.invalid) {
            return;
        }
        if (this.selected) {
            this.validateForm.controls['layoutModuleObject'].setValue([{ id: this.selected }])
        }
        this.saveLoading = true;
        let param = this.validateForm.value;
        this.templateService.saveNewsArticles(param).subscribe(
            obj => {
                tipMessage('保存成功', 'success');
                this.saveLoading = false;
                this.refresh.emit(obj);
            },
            err => {
                tipMessage(err);
                this.saveLoading = false;
            }
        );
    }
    onBack() {
        this.back.emit()
    }
}
