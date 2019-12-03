import { NzModalService, NzMessageService, NzModalSubject } from 'ng-zorro-antd';
import { UgcActivityExpert } from './../../../entity/ugc-activity-expert';
import { ActivatedRoute } from '@angular/router';
import { UgcActivity } from './../../../entity/ugc-activity';
import { UgcActivityExpertService } from './../../../service/ugc-activity-expert.service';
import { Course } from './../../../../learning/course/entity/course';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
    selector: 'spk-ugc-activity-expert-list',
    templateUrl: './ugc-activity-expert-list.component.html',
    styleUrls: ['./ugc-activity-expert-list.component.scss']
})
export class UgcActivityExpertListComponent implements OnInit {

    ugcActivity: UgcActivity;
    searchList: any;
    data: Pagination<UgcActivityExpert>;
    loading: boolean;
    selection: UgcActivityExpert[];
    _searchForm: FormGroup;
    userLookupModal: NzModalSubject;
    columns: Column[] = [
        { title: '用户名', tpl: 'usename' },
        { title: '专家姓名', tpl: 'dispaleName' },
        { title: '手机号', tpl: 'phoneNumber' },
        { title: '电子邮箱', tpl: 'email' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' },
    ];

    constructor(
        private route: ActivatedRoute,
        private ugcActivityExpertService: UgcActivityExpertService,
        private fb: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
            this.initSearchForm();
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
        this.ugcActivityExpertService.getAllOfPage(this.ugcActivity.id, params).subscribe(
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

    openUserLookupDialog(titleTpl, contentTpl, footerTpl) {
        this.userLookupModal = this.modal.open({
            title: titleTpl,
            content: contentTpl,
            footer: footerTpl,
            maskClosable: false,
            width: 1000
        });
    }

    userLookupOk(selected) {
        // let selected = this.userSelected;
        if (selected && selected.length > 0) {
            // TODO: send to server
            this.ugcActivityExpertService.add(this.ugcActivity.id, selected.map(it => it.id)).subscribe(
                ok => {
                    this.message.success('添加用户成功');
                    this.loadData();
                    // this.layerRef.close();
                    this.userLookupModal.destroy('onOk');
                },
                err => {
                    this.message.error(err);
                }
            );
        } else {
            this.modal.warning({ title: '请选择要添加的用户！', zIndex: 1200 });
            return;
        }
    }

    userLookupCancel() {
        this.userLookupModal.destroy('onCancel');
    }


    delete(auditors: UgcActivityExpert[], single_flag?: boolean) {
        auditors = auditors ? auditors : this.selection;
        if ( !auditors || auditors.length <= 0) {
            this.message.warning('请选择需要删除的专家');
            return;
        }
        if (single_flag) {
            this.ugcActivityExpertService.deleted(this.ugcActivity.id, auditors.map(it => it.id)).subscribe(
                () => {
                    this.message.success('删除成功');
                    this.loadData();
                },
                err => { this.message.error(err.message); }
            );
        } else {
            this.modal.confirm({
                title: "确认要删除选中的专家吗？",
                onOk: () => {
                    this.ugcActivityExpertService.deleted(this.ugcActivity.id, auditors.map(it => it.id)).subscribe(
                        () => {
                            this.message.success('删除成功');
                            this.loadData();
                        },
                        err => { this.message.error(err.message); }
                    );
                }
            })
        }
    }

}
