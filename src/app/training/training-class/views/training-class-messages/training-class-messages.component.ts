import { InnerHtmlPipe } from './../../../../shared/widget/pipes/inner-html.pipe';
import { TrainingClassMessageApiService } from './../../../service/training-class-message.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CuiPagination, Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TrainingClass } from './../../../entity/training-class';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    templateUrl: './training-class-messages.component.html',
    styleUrls: ['./training-class-messages.component.scss'],
})
export class TrainingClassMessagesComponent implements OnInit {
    data: Pagination<any>;
    trainingClass: TrainingClass;
    messageBoxId: number;
    selection: any;
    loading: boolean = false;
    showInfo: boolean = false;
    showInfoLoading: boolean = false;
    oneMess: any;
    selectId: number;
    columns: Column[] = [
        { title: '主题', data: 'title', style: { 'max-width': '100px', width: '100px', 'word-break': 'break-all' } },
        { title: '站内消息发送状态', tpl: 'innerMessage', styleClass: 'text-center' },
        { title: 'email', tpl: 'emailMessage', styleClass: 'text-center' },
        // { title: '短信', tpl: 'shortMessage', styleClass: 'text-center' },
        { title: '接收人/人数', data: 'totalReceiver', styleClass: 'text-center' },
        { title: '创建人', data: 'createdBy.displayName', styleClass: 'text-center' },
        { title: '发送时间', tpl: 'sendTime', styleClass: 'text-center' },
    ];
    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;

    // 消息列表
    messageDatas: Pagination<any>;
    messageLoading: boolean = false;
    showMessage: boolean = false;

    showReceiveUsers: boolean = false;
    showEmailMessage: boolean = false;

    messageColumns: Column[] = [
        { title: '用户名', data: 'user.username', styleClass: 'text-center' },
        { title: '手机号码', data: 'phoneNumber', styleClass: 'text-center' },
        { title: '发送状态', tpl: 'sendStatus', styleClass: 'text-center' },
        { title: '失败原因', data: 'failedReoson', styleClass: 'text-center' },
    ];
    emailMessageColumns: Column[] = [
        { title: '用户名', data: 'user.username', styleClass: 'text-center' },
        { title: '邮箱', data: 'email', styleClass: 'text-center' },
        { title: '发送状态', tpl: 'sendStatus', styleClass: 'text-center' },
        { title: '失败原因', data: 'failedReoson', styleClass: 'text-center' },
    ];
    messageUserColumns: Column[] = [
        { title: '用户名', data: 'user.username', styleClass: 'text-left' },
        { title: '姓名', data: 'user.displayName', styleClass: 'text-left' },
        { title: '手机号码', data: 'user.phoneNumber', styleClass: 'text-left' },
        { title: '邮箱', data: 'user.email', styleClass: 'text-left' },
        { title: '所属组织', data: 'user.userGroup.namePath', styleClass: 'text-left' },
    ];
    messageInfo: Column[] = [
        { title: '主题', data: 'title', styleClass: 'text-center' },
        { title: '正文', tpl: 'content', styleClass: 'text-center' },
        { title: '附件', tpl: 'attachmentName', styleClass: 'text-center' },
        { title: '发送方式', tpl: 'types', styleClass: 'text-center' },
        { title: '发布时间', tpl: 'sendTime', styleClass: 'text-center' },
        { title: '接收人', tpl: 'receiveUsers', styleClass: 'text-center' },
        { title: '创建人', data: 'createdBy.displayName', styleClass: 'text-center' },
        { title: '创建时间', tpl: 'createdDate', styleClass: 'text-center' }
    ]
    messageForm: FormGroup;
    messageId: number;
    messageType: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private trainingClassMessageApi: TrainingClassMessageApiService,
        private confirmServ: NzModalService
    ) { };
    ngOnInit() {
        this.route.data.subscribe((data: { target: TrainingClass }) => {
            console.log(data.target);
            this.trainingClass = data.target;
            this.messageBoxId = this.trainingClass.messageBoxId;
        });
        this.initSearchForm();
        this.loadData();
        this.loading = false;
    }
    hasMessageBox() {
        return this.trainingClass.messageBoxId > 0;
    }

    initMessageBox() {
        this.trainingClassMessageApi.initMessageBox(this.trainingClass.id).subscribe(
            msgId => {
                this.trainingClass.messageBoxId = msgId;
                this.messageBoxId = msgId;
                tipMessage('初始化培训班消息成功', 'success');
            },
            err => {
                tipMessage('初始化培训班消息失败，请重试！', '', 4000);
            }
        )
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            title: [],
        });
    }

    loadData() {
        if (this.hasMessageBox()) {
            this.loading = true;
            let params = {
                ...this._searchForm.value,
                'messageBox.id': this.messageBoxId,
                page: this.data ? this.data.number : 0,
                size: this.data ? this.data.size : 10,
            };
            this.trainingClassMessageApi.getAllOfPage(params).subscribe(
                obj => {
                    this.data = obj;
                    this.loading = false;
                },
                err => {
                    this.loading = false;
                }
            );
        }
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.loadData();
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    showModal(row) {
        this.showInfo = true;
        this.showInfoLoading = true;
        this.selectId = row.id;
        this.trainingClassMessageApi.getOne(this.selectId).subscribe(
            obj => {
// !!消息详情
                this.oneMess = obj;
                console.log(this.oneMess,'消息列表')
                this.showInfoLoading = false;
            },
            error => {
                tipMessage(error);
                this.showInfoLoading = false;
            }
        )
    }
    isAfterYestday(theDate) {
        let date = (new Date());    // 当前时间
        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();  // 今天凌晨
        let yestday = new Date(today - 24 * 3600 * 1000).getTime();
        return new Date(theDate).getTime() >= yestday;
    }
    downloadAttachment(id) {
        if (id != null) {
            let url;
            if (!window.location.origin) {
                url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            } else {
                url = window.location.origin;
            }
            window.open(url + "/api/messages/" + id + "/download");
        }
    }
    revokeOne(row) {
        if (!this.isAfterYestday(row.sendTime)) {
            tipMessage('时间已过期不能撤销');
            return;
        };
        let This = this;
        this.confirmServ.confirm({
            title: '您是否确认要撤销发送这条消息',
            zIndex: 1003,
            onOk() {
                This.trainingClassMessageApi.revokeOne(row.id).subscribe(
                    ok => {
                        tipMessage('撤销成功', 'success');
                        this.loadData();
                    },
                    error => {
                        tipMessage("撤销失败");
                    }
                )
            },
        });
    }

    handleCancel(e) {
        this.showInfo = false;
    }


    // 弹出消息列表
    messageListShow(row, type) {
        if (type == "E") {
            this.showMessage = true;
        } else {
            this.showReceiveUsers = true;
        }
        // if (type == "E") {
        //     this.showEmailMessage = true;
        // } else if (type == "I") {
        //     this.showReceiveUsers = true;
        // } else {
        //     this.showMessage = true;
        // }

        this.messageSearchForm();
        // let page = {
        //     page: 0,
        //     size: this.messageDatas ? this.messageDatas.size : 10,
        // }
        this.messageData(row.id, type);
        this.messageId = row.id;
        this.messageType = type;

        // this.messageSearchForm();
        // this.messageData(row.id, type);
        // this.messageId = row.id;
        // this.messageType = type;
    }
    // 初始化表单
    messageSearchForm() {
        this.messageForm = this.fb.group({
            username: [""],
        });
        this.messageDatas = null;
    }

    messageData(id, type, page?: any) {
        this.messageLoading = true;
        let params = {
            ...this.messageForm.value,
            page: this.messageDatas ? this.messageDatas.number : 0,
            size: this.messageDatas ? this.messageDatas.size : 10,
        };
        if(page) params['page'] = 0;
        if (type == 'E') {
            this.trainingClassMessageApi.getEmail(id, params).subscribe(
                obj => {
                    this.messageDatas = obj;
                    this.messageLoading = false;
                },
                err => {
                    this.messageLoading = false;
                }
            );
        } else {
            this.trainingClassMessageApi.getShort(id, params).subscribe(
                obj => {
                    this.messageDatas = obj;
                    this.messageLoading = false;
                },
                err => {
                    this.messageLoading = false;
                }
            );
        }

    }
    _submitMessForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.messageData(this.messageId, this.messageType,true);
    }
    handleCancelMess(e) {
        this.showMessage = false;
        this.messageForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.messageForm.controls) {
            this.messageForm.controls[key].markAsPristine();
        }
    }
    handleCancelEmailMess(e) {
        this.showEmailMessage = false;
        this.messageForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.messageForm.controls) {
            this.messageForm.controls[key].markAsPristine();
        }
    }
    handleCancelReceiveUsers(e) {
        this.showReceiveUsers = false;
        this.messageForm.reset();
    }
    showReceiveUsersModal(row) {
        this.showReceiveUsers = true;
    }
}
