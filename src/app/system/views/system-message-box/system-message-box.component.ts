import { InnerHtmlPipe } from './../../../shared/widget/pipes/inner-html.pipe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CuiPagination, Column, Message } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { SystemMessageBoxService } from 'app/system/service/system-message-box-service';
import { TrainingClassMessageApiService } from 'app/training/service/training-class-message.service';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-system-message-box',
    templateUrl: './system-message-box.component.html',
    styleUrls: ['./system-message-box.component.scss']
})
export class SystemMessageBoxComponent implements OnInit {

    loading: boolean = false;
    messageBoxId: number;
    messages: Message[];

    _searchForm: FormGroup;
    pagination: CuiPagination;
    searchtext: string;
    showInfo: boolean = false;
    showInfoLoading: boolean = false;
    showReceiveUsers: boolean = false;
    oneMess: any = [];
    selectId: number;


    columns: Column[] = [
        { title: '主题', data: 'title', style: { 'max-width': '100px', width: '100px' } },
        { title: '站内消息发送状态', tpl: 'innerMessage', styleClass: 'text-center' },
        { title: 'email', tpl: 'emailMessage', styleClass: 'text-center' },
        { title: '短信', tpl: 'shortMessage', styleClass: 'text-center' },
        { title: '接收人数', tpl: 'totalReceiver', styleClass: 'text-center' },
        { title: '创建人', data: 'createdBy.displayName', styleClass: 'text-center' },
        { title: '发送时间', tpl: 'sendTime', styleClass: 'text-center' },
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
    messageUserColumns: Column[] = [
        { title: '用户名', data: 'user.username', styleClass: 'text-center' },
        { title: '姓名', data: 'user.displayName', styleClass: 'text-center' }
    ]
    showEmailMessage: boolean = false;
    messageForm: FormGroup;
    messageId: number;
    messageType: string;

    // 消息列表
    messageDatas: Pagination<any>;
    messageLoading: boolean = false;
    showMessage: boolean = false;

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

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private confirmServ: NzModalService,
        private systemMessageBox: SystemMessageBoxService,
        private trainingClassMessageApi: TrainingClassMessageApiService
    ) { }

    ngOnInit() {
        this.systemMessageBox.getDefault().subscribe(
            data => {
                if (data) {
                    this.messageBoxId = data.id;
                    this.initSearchForm();
                    this.loadData();
                }
            }
        );
    }

    /**
     * 判断是否初始化组件
     */
    hasMessageBox() {
        return this.messageBoxId > 0;
    }
    /**
     * 初始化组件
     */
    initMessageBox() {
        this.systemMessageBox.initMessageBox().subscribe(
            data => {
                this.messageBoxId = data.id;
            }
        );
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            title: '',
        });
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;

        let params = {
            ...this._searchForm.value,
            page: page ? page.number : 0,
            size: page ? page.size : '10',
            sort: page && page.sort ? page.sort : ''
        };
        this.systemMessageBox.list(this.messageBoxId, params).subscribe(
            pag => {
                this.pagination = pag;
                this.messages = pag.content;
            }
        );
    }

    revokeOne(row) {
        if (!this.isAfterYestday(row.sendTime)) {
            tipMessage('时间已过期不能撤销', 'error');
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
                        This.loadData();
                    },
                    error => {
                        tipMessage('撤销失败', 'error');
                    }
                )
            },
        });
    }
    isAfterYestday(theDate) {
        let date = (new Date());    // 当前时间
        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();  // 今天凌晨
        let yestday = new Date(today - 24 * 3600 * 1000).getTime();
        return new Date(theDate).getTime() >= yestday;
    }

    handleCancel(e) {
        this.showInfo = false;
    }
    handleCancelReceiveUsers(e) {
        this.showReceiveUsers = false;
        this.messageForm.reset();
    }
    showModal(row) {
        this.showInfo = true;
        this.showInfoLoading = true;
        this.selectId = row.id;
        this.oneMess = [];
        this.trainingClassMessageApi.getOne(this.selectId).subscribe(
            obj => {
                this.oneMess.push(obj);
                this.showInfoLoading = false;
            },
            error => {
                tipMessage(error, 'error');
                this.showInfoLoading = false;
            }
        )
    }


    // 弹出消息列表
    messageListShow(row, type) {
        if (type == "E") {
            this.showEmailMessage = true;
        } else if (type == "I") {
            this.showReceiveUsers = true;
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

    messageData(id, type, page?: any) {
        this.messageLoading = true;
        let params;
        if (page) {
            params = {
                ...this.messageForm.value,
                page: page ? page.number : 0,
                size: page ? page.size : 10,
            };
        } else {
            params = {
                ...this.messageForm.value,
                page: this.messageDatas ? this.messageDatas.number : 0,
                size: this.messageDatas ? this.messageDatas.size : 10,
            };
        }
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
        } else if (type == 'I') {
            this.trainingClassMessageApi.getInner(id, params).subscribe(
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
        let page = {
            page: 0,
            size: this.messageDatas ? this.messageDatas.size : 10,
        }
        this.messageData(this.messageId, this.messageType, page);
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

    downloadAttachment(id) {
        if (id != null) {
            // this.trainingClassMessageApi.download(id)
            let url;
            if (!window.location.origin) {
                url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            } else {
                url = window.location.origin;
            }
            window.open(url + "/api/messages/" + id + "/download");
        }
    }
}
