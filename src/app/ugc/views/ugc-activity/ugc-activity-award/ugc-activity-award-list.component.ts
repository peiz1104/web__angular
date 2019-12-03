import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { UgcActivityAward } from './../../../entity/ugc-activity-award';
import { ActivatedRoute } from '@angular/router';
import { UgcActivity } from './../../../entity/ugc-activity';
import { UgcActivityAwardService } from './../../../service/ugc-activity-award.service';
import { Course } from './../../../../learning/course/entity/course';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UgcActivityWork } from '../../../entity/ugc-activity-work';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-activity-award-list',
    templateUrl: './ugc-activity-award-list.component.html',
    styleUrls: ['./ugc-activity-award-list.component.scss']
})
export class UgcActivityAwardListComponent implements OnInit {

    ugcActivity: UgcActivity;
    searchList: any;
    data: Pagination<UgcActivityAward>;
    loading: boolean;
    selection: UgcActivityAward[];
    _searchForm: FormGroup;
    addLoading: boolean;
    columns: Column[] = [
        { title: '标题', tpl: 'title' },
        { title: '所有者', tpl: 'owner' },
        { title: '创建者', tpl: 'createdBy' },
        { title: '创建时间', tpl: 'createdDate' },
        { title: '发布状态', tpl: 'isPublished' },
        { title: '名次', tpl: 'displayOrder' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' },
    ];

    workData: Pagination<UgcActivityWork>;
    selectionWorks: UgcActivityWork[];
    _searchWorkForm: FormGroup;
    showWorks: boolean = false;
    workColumns: Column[] = [
        { title: '作品名称', tpl: 'title' },
        { title: '所有者', tpl: 'owner' },
        { title: '分类', tpl: 'category' }
    ];


    showDisplayOrder: boolean = false;
    _displayOrderForm: FormGroup;
    selectId: number;

    constructor(
        private route: ActivatedRoute,
        private ugcActivityAwardService: UgcActivityAwardService,
        private fb: FormBuilder,
        private message: NzMessageService,
        private modal: NzModalService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
            this.initSearchForm();
            this.initDisplayOrderForm();
            this.loadData();
        });
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: [],
        });
    }
    loadData() {
        let params = {
            ...this.searchList,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        this.loading = true;
        this.ugcActivityAwardService.getAllOfPage(this.ugcActivity.id, params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            error => {
                this.loading = false;
            }
        );
    }

    _submitForm($event, value) {
        $event.preventDefault();
        this.searchList = value;
        this.loadData();
    }

    publish(awards: UgcActivityAward[], single_flag?: boolean) {
        awards = awards ? awards : this.selection;
        if ( !awards || awards.length <= 0) {
            tipMessage('请选择需要操作的获奖作品', 'warning');
            return;
        }
        if (single_flag) {
            this.ugcActivityAwardService.publish(this.ugcActivity.id, awards.map(it => it.id)).subscribe(
                () => {
                    tipMessage('发布获奖作品成功', 'success');
                    awards.forEach(it => it.isPublished = true);
                },
                err => { this.message.error(err.message); }
            );
        } else {
            this.modal.confirm({
                title: "确认要发布选中的获奖作品吗？",
                onOk: () => {
                    this.ugcActivityAwardService.publish(this.ugcActivity.id, awards.map(it => it.id)).subscribe(
                        () => {
                        tipMessage('发布获奖作品成功', 'success');
                            awards.forEach(it => it.isPublished = true);
                        },
                    err => {
                        tipMessage(err.message);
                    }
                    );
                }
            })
        }
    }
    cancel(awards: UgcActivityAward[], single_flag?: boolean) {
        awards = awards ? awards : this.selection;
        if ( !awards || awards.length <= 0) {
            tipMessage('请选择需要操作的获奖作品', 'warning');
            return;
        }
        if (single_flag) {
            this.ugcActivityAwardService.cancel(this.ugcActivity.id, awards.map(it => it.id)).subscribe(
                () => {
                    tipMessage('取消发布获奖作品成功', 'success');
                    awards.forEach(it => it.isPublished = false);
                },
                err => { tipMessage(err.message); }
            );
        } else {
            this.modal.confirm({
                title: "确认要取消发布选中的获奖作品吗？",
                onOk: () => {
                    this.ugcActivityAwardService.cancel(this.ugcActivity.id, awards.map(it => it.id)).subscribe(
                        () => {
                        tipMessage('取消发布获奖作品成功', 'success');
                            awards.forEach(it => it.isPublished = false);
                        },
                    err => {
                        tipMessage(err.message);
                    }
                    );
                }
            })
        }
    }

    delete(awards: UgcActivityAward[], single_flag?: boolean) {
        awards = awards ? awards : this.selection;
        if ( !awards || awards.length <= 0) {
            tipMessage('请选择需要删除的获奖作品', 'warning');
            return;
        }
        if (single_flag) {
            this.ugcActivityAwardService.deleted(this.ugcActivity.id, awards.map(it => it.id)).subscribe(
                () => {
                    tipMessage('删除获奖作品成功', 'success');
                    this.loadData();
                },
                err => { tipMessage(err.message); }
            );
        } else {
            this.modal.confirm({
                title: "确认要删除选中的获奖作品吗？",
                onOk: () => {
                    this.ugcActivityAwardService.deleted(this.ugcActivity.id, awards.map(it => it.id)).subscribe(
                        () => {
                        tipMessage('删除获奖作品成功', 'success');
                            this.loadData();
                        },
                    err => {
                        tipMessage(err.message);
                    }
                    );
                }
            })
        }
    }


    loadWorksData() {
        let params = {
            ...this.searchList,
            page: this.workData ? this.workData.number : 0,
            size: this.workData ? this.workData.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        this.ugcActivityAwardService.getAllUnselectedOfPage(this.ugcActivity.id, params).subscribe(
            workData => {
                this.workData = workData;
            },
            err => { this.message.error(err.message); }
        );
    }


    addWorks() {
        this.showWorks = true;
        this.initSearchWorkForm();
        this.loadWorksData();
    }
    initSearchWorkForm() {
        this._searchWorkForm = this.fb.group({
            searchText: [],
        });
    }
    confirm(event) {
        this.addLoading = true;
        if (this.selectionWorks == null || this.selectionWorks.length <= 0 ) {
            this.showWorks = false;
            this.addLoading = false;
            return;
        }
        this.ugcActivityAwardService.add(this.ugcActivity.id,  this.selectionWorks.map(it => it.id)).subscribe(
            data => {
                // this.data = data;
                this.showWorks = false;
                this.addLoading = false;
                this.loadData();
            },
            err => { this.message.error(err.message); this.addLoading = false; }
        );
    }

    handleCancel(e) {
        this.showWorks = false;
    }

    getFormControl(name) {
        return this._displayOrderForm.controls[name];
    }

    initDisplayOrderForm() {
        this._displayOrderForm = this.fb.group({
            displayOrder: 0
        });
    }
    showModal(row) {
        this.showDisplayOrder = true;
        this.selectId = row.id;
        this.getFormControl('displayOrder').setValue(row.displayOrder ? row.displayOrder : 0  );
    }
    onSubmit() {
        let value = this._displayOrderForm.value;
        value.id = this.selectId;
        this.ugcActivityAwardService.edit(this.ugcActivity.id, value).subscribe(
            ok => {
                tipMessage('保存成功', 'success');
                this.showDisplayOrder = false;
                this.loadData();
            },
            err => {
                tipMessage(err);
                this.showDisplayOrder = false;
            }
        )
    }

    handleCancelDisplayOrder(e) {
        this.showDisplayOrder = false;
    }


}
