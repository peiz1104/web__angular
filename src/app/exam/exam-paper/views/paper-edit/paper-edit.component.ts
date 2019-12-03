import { Component, OnInit, DoCheck } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';


@Component({
    selector: 'spk-paper-edit',
    templateUrl: './paper-edit.component.html',
    styleUrls: ['./paper-edit.component.scss']
})
export class PaperEditComponent implements OnInit, DoCheck {
    _validateForm: FormGroup;
    paperId: any;
    fromData: any;
    _startDate = null;
    _endDate = null; // 开始时间与结束时间
    initFormData: any = {};
    btnstate: any;
    link: any = {};
    queryParams: any = {};
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private _message: NzMessageService,
        private confirmServ: NzModalService,
        private fb: FormBuilder,
        private exampaperservice: ExamPaperService
    ) { }
    ngOnInit() {
        let m = window.location.pathname.indexOf('updatepaper') != -1;
        let n = window.location.pathname.indexOf('addtest') != -1;
        if (m) {
            this.btnstate = 'EP';
        }
        if (n) {
            this.btnstate = 'AT';
        }
        this.queryParams = this.routeInfo.snapshot.params;
        if (!this.queryParams['userGroupId'] && !this.queryParams['name']) {
            var qs = (window.location.pathname.length > 0 ? window.location.pathname : '');
            var items = qs.split(';');
            var item = null,
                name = null,
                value = null;
            for (var i = 0; i < items.length; i++) {
                if (items[i].indexOf('=') != -1) {
                    item = items[i].split('=');
                    name = decodeURIComponent(item[0]);
                    value = decodeURIComponent(item[1]);
                    this.link[name] = value;
                }
            }
            this.queryParams = this.link;
        } else {
            this.link = {
                userGroupId: this.queryParams['userGroupId'],
                name: this.queryParams['name']
            }
        }
        if (!this.link.userGroupId || this.link.userGroupId == 'undefined') {
            this.link = {};
            console.log('nolink');
        }

    }
    ngDoCheck() {
        let m = window.location.pathname.indexOf('updatepaper') != -1;
        let n = window.location.pathname.indexOf('addtest') != -1;
        if (m) {
            this.btnstate = 'EP';
        }
        if (n) {
            this.btnstate = 'AT';
        }
    }
    // 关闭弹窗
    showConfirm = () => {
        let self = this;
        this.confirmServ.confirm({
            title: '关闭提示',
            content: '确定不进行操作关闭本页面！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                self.route.navigate(['/exam/exam-paper'])
            },

            onCancel(e) {
            }
        });
    }

    // 编辑页面
    goToEdit = () => {
        const epId = this.routeInfo.snapshot.params.id
        this.route.navigate([`/exam/exam-paper/editpaper/${epId}/addtest`, this.queryParams['userGroupId'] ? {
            epId,
            userGroupId: this.queryParams['userGroupId'],
            name: this.queryParams['name']
        } : { epId }])
    }

}
