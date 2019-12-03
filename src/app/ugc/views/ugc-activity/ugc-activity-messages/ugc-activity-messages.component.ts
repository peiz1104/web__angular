import { InnerHtmlPipe } from './../../../../shared/widget/pipes/inner-html.pipe';
import { UgcActivityMessageService } from './../../../service/ugc-activity-message.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CuiPagination, Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UgcActivity } from './../../../entity/ugc-activity';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  templateUrl: './ugc-activity-messages.component.html',
  styleUrls: ['./ugc-activity-messages.component.scss'],
})
export class UgcActivityMessagesComponent implements OnInit {
  data: Pagination<any>;
  ugcActivity: UgcActivity;
  messageBoxId: number;
  selection: any;
  loading: boolean = false;
  showInfo: boolean = false;
  showInfoLoading: boolean = false;
  oneMess: any = [];
  selectId: number;
  columns: Column[] = [
    { title: '主题', data: 'title', style: { 'max-width': '100px', width: '100px' } },
    { title: '站内消息发送状态', tpl: 'innerMessage', styleClass: 'text-center' },
    { title: 'email', tpl: 'emailMessage', styleClass: 'text-center' },
    { title: '短信', tpl: 'shortMessage', styleClass: 'text-center' },
    { title: '接收人数', data: 'totalReceiver', styleClass: 'text-center' },
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
    { title: '发送方式', tpl: 'types', styleClass: 'text-center' },
    { title: '发布时间', tpl: 'sendTime', styleClass: 'text-center' },
    { title: '接收人', tpl: 'receiveUsers', styleClass: 'text-center' },
    { title: '创建人', data: 'createdBy.displayName', styleClass: 'text-center' },
    { title: '创建时间', tpl: 'createdDate', styleClass: 'text-center' }
  ]
  messageUserColumns:  Column[] = [
    { title: '用户名', data: 'user.username', styleClass: 'text-center' },
    { title: '姓名', data: 'user.displayName', styleClass: 'text-center' }
  ]
  messageForm: FormGroup;
  messageId: number;
  messageType: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ugcActivityMessageService: UgcActivityMessageService,
    private _message: NzMessageService,
    private confirmServ: NzModalService
  ) { };
  ngOnInit() {
    this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
      this.ugcActivity = data.ugcActivity;
      this.messageBoxId = this.ugcActivity.messageBoxId;
    });
    this.initSearchForm();
    this.loadData();
    this.loading = false;
  }
  hasMessageBox() {
    return this.ugcActivity.messageBoxId > 0;
  }
  handleCancelReceiveUsers(e) {
    this.showReceiveUsers = false;
    this.messageForm.reset();
  }

  initMessageBox() {
    this.ugcActivityMessageService.initMessageBox(this.ugcActivity.id).subscribe(
      msgId => {
        this.ugcActivity.messageBoxId = msgId;
        this.messageBoxId = msgId;
        this._message.success('初始化课程共创活动消息成功');
        this.router.navigate(['.'], { relativeTo: this.route, queryParams: { t: Math.random() } });
      },
      err => {
        this._message.error('初始化课程共创活动消息失败，请重试！');
      }
    )
  }
  initSearchForm() {
    this._searchForm = this.fb.group({
      title: [],
    });
  }

  loadData() {
    if (this.hasMessageBox() ) {
      this.loading = true;
      let params = {
        ...this._searchForm.value,
        'messageBox.id': this.messageBoxId,
        page: this.data ? this.data.number : 0,
        size: this.data ? this.data.size : 10,
      };
      this.ugcActivityMessageService.getAllOfPage(params).subscribe(
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
    this.oneMess = [];
    this.ugcActivityMessageService.getOne(this.selectId).subscribe(
      obj => {
        this.oneMess.push(obj);
        this.showInfoLoading = false;
      },
      error => {
        this._message.create("error", error);
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
  downloadAttachment(attachmentUrl) {
    if (attachmentUrl != null) {
      window.location.href = window.location.origin + attachmentUrl;
    }
  }
  revokeOne(row) {
    if (!this.isAfterYestday(row.sendTime)) {
      this._message.create("error", "时间已过期不能撤销");
      return;
    };
    let This = this;
    this.confirmServ.confirm({
      title: '您是否确认要撤销发送这条消息',
      onOk() {
        This.ugcActivityMessageService.revokeOne(row.id).subscribe(
          ok => {
            This.loadData();
            This._message.create("success", "撤销成功");
          },
          error => {
            This._message.create("error", "撤销失败");
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
        size: page ? page.size  : 10,
      };
    }else {
      params = {
        ...this.messageForm.value,
        page: this.messageDatas ? this.messageDatas.number : 0,
        size: this.messageDatas ? this.messageDatas.size : 10,
      };
    }
    if (type == 'E') {
      this.ugcActivityMessageService.getEmail(id, params).subscribe(
        obj => {
          this.messageDatas = obj;
          this.messageLoading = false;
        },
        err => {
          this.messageLoading = false;
        }
      );
    } else if (type == 'I') {
      this.ugcActivityMessageService.getInner(id, params).subscribe(
        obj => {
          this.messageDatas = obj;
          this.messageLoading = false;
        },
        err => {
          this.messageLoading = false;
        }
      );
    }  else {
      this.ugcActivityMessageService.getShort(id, params).subscribe(
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
}
