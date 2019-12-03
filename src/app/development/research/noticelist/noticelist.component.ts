import { Component, OnInit } from '@angular/core';
import { InnerHtmlPipe } from './../../../shared/widget/pipes/inner-html.pipe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CuiPagination, Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ResearchService } from './../service/research.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-noticelist',
    templateUrl: './noticelist.component.html',
    styleUrls: ['./noticelist.component.scss']
})
export class NoticelistComponent implements OnInit {
    data: Pagination<any>;
    selection: any = [];
    isSelf: any;
    devStatus: any;
    stepId: any;
    messageBoxId: any;
    devId: any;
    loading: boolean = true;
    showInfo: boolean = false;
    showInfoLoading: boolean = false;
    oneMess: any = [];
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


    showEmailMessage: boolean = false;

    messageColumns: Column[] = [
        { title: '用户名', data: 'user.username', styleClass: 'text-center' },
        { title: '手机号码', data: 'phoneNumber', styleClass: 'text-center' },
        { title: '发送状态', data: 'sendStatus', styleClass: 'text-center' },
        { title: '失败原因', data: 'failedReoson', styleClass: 'text-center' },
    ];
    emailMessageColumns: Column[] = [
        { title: '用户名', data: 'user.username', styleClass: 'text-center' },
        { title: '邮箱', data: 'email', styleClass: 'text-center' },
        { title: '发送状态', data: 'sendStatus', styleClass: 'text-center' },
        { title: '失败原因', data: 'failedReoson', styleClass: 'text-center' },
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
        private service: ResearchService,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.stepId = params.get('stepId');
            this.messageBoxId = params.get('messageBoxId');
            this.devId = params.get('id');
        })

        this.route.queryParamMap.subscribe((params) => {
            this.devStatus = params.get('status');
            this.isSelf = params.get('isSelf');
        })
        this.initSearchForm();
        this.loadData();
        this.loading = false;
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            title: [],
        });
    }

    loadData() {
        this.loading = true;
        let params = {
            ...this._searchForm.value,
            'messageBox.id': this.messageBoxId,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
        };
        this.service.getnoticelist(params).subscribe(
            obj => {
                this.data = obj;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
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
    isAfterYestday(theDate) {
        let date = (new Date());    // 当前时间
        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();  // 今天凌晨
        let yestday = new Date(today - 24 * 3600 * 1000).getTime();
        return new Date(theDate).getTime() >= yestday;
    }
    downloadAttachment(attachmentUrl) {
        if (attachmentUrl != null) {
            window.location.href = window.location.origin + attachmentUrl;
        }
    }
    revokeOne(row) {
        if (!this.isAfterYestday(row.sendTime)) {
            tipMessage('时间已过期不能撤销')
            return;
        };
        let This = this;
        this.confirmServ.confirm({
            title: '您是否确认要撤销发送这条消息',
            zIndex: 1003,
            onOk() {
                This.service.revokeOne(row.id).subscribe(
                    ok => {
                        tipMessage('撤销成功！', 'success');
                        this.loadData();
                    },
                    error => {
                        tipMessage('撤销失败');
                    }
                )
            },
        });
    }

    handleCancel(e) {
        this.showInfo = false;
    }
    // 返回
    goBack() {
        window.history.back();
    }
    // 弹出消息列表
    messageListShow(row, type) {
        if (type == "E") {
            this.showEmailMessage = true;
        } else {
            this.showMessage = true;
        }

        this.messageSearchForm();
        this.messageData(row.id, type);
        this.messageId = row.id;
        this.messageType = type;
    }
    // 初始化表单
    messageSearchForm() {
        this.messageForm = this.fb.group({
            username: [""],
        });
        this.messageDatas = null;
    }

    messageData(id, type, page?: CuiPagination) {
        this.messageLoading = true;
        let params = {
            ...this.messageForm.value,
            page: this.messageDatas ? this.messageDatas.number : 0,
            size: this.messageDatas ? this.messageDatas.size : 10,
        };
        if (type == 'E') {
            this.service.getEmail(id, params).subscribe(
                obj => {
                    this.messageDatas = obj;
                    this.messageLoading = false;
                },
                err => {
                    this.messageLoading = false;
                }
            );
        } else {
            this.service.getShort(id, params).subscribe(
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
    showModal(row) {
        this.showInfo = true;
        this.showInfoLoading = true;
        this.selectId = row.id;
        this.oneMess = [];
        this.service.getOne(this.selectId).subscribe(
            obj => {
                this.oneMess.push(obj);
                this.showInfoLoading = false;
            },
            error => {
                tipMessage(error);
                this.showInfoLoading = false;
            }
        )
    }
    _submitMessForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.messageData(this.messageId, this.messageType);
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
}
