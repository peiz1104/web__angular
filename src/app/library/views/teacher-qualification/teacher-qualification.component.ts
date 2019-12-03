import { TeachernewService } from './../../service/teachernew.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacher-qualification',
    templateUrl: './teacher-qualification.component.html',
    styleUrls: ['./teacher-qualification.component.scss']
})
export class TeacherQualificationComponent implements OnInit {

    data: Pagination<any>;
    loading: boolean;
    selection: any;
    searchBy: {
        teacherNo?: any,
        teacherName?: any,
        userGroupId?: any,
        lv?: any
    } = {};
    columns: Column[] = [
        { title: '用户名', data: 'user.username', styleClass: 'text-left' },
        { title: '姓名', data: 'user.displayName', styleClass: 'text-left' },
        { title: '所属机构', tpl: 'userGroupCol', styleClass: 'text-left' },
        { title: '任职资格', tpl: 'lvs', styleClass: 'text-center' },
        { title: '资格获取的时间', tpl: 'myDate', styleClass: 'text-center' },
        { title: '所属岗位', tpl: 'post', styleClass: 'text-left' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];

    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;
    _options: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private teachernewService: TeachernewService,
        private message: NzMessageService,
        private traingapiServer: AuthService,
        private fb: FormBuilder,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.initSearchForm();
        this.traingapiServer.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroupId = user.managerGroup;
                    this._searchForm.get('userGroupId').setValue(user.managerGroup)
                }
                this.loadData();
            }
        )
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            teacherNo: [],
            teacherName: [],
            userGroupId: [],
            lv: []
        });
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.searchBy.teacherNo) {
            params['teacherNo'] = this.searchBy.teacherNo;
        };
        if (this.searchBy.teacherName) {
            params['teacherName'] = this.searchBy.teacherName;
        };
        if (this.searchBy.userGroupId) {
            params['userGroupId'] = this.searchBy.userGroupId.id;
        };
        if (this.searchBy.lv) {
            params['lv'] = this.searchBy.lv;
        };
        this.teachernewService.pageList(params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    hasSelection() {
        return this.selection && this.selection.length > 0;
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        // console.log(this.searchBy, 2333)
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

    isLvs(str) {
        if (str == 'PREPARATORY') {
            return '预备讲师';
        } else if (str == 'ASSISTANT') {
            return '助理讲师';
        } else if (str == 'LECTURER') {
            return '中级讲师';
        } else {
            return '高级讲师';
        }
    }

    delete(param?: any) {
        let selected = param ? [param] : this.selection;
        if (!selected || selected.length == 0) {
            this.modal.warning({
                title: `请选择要删除的讲师`,
                zIndex: 1003,
            });
            return;
        }

        this.modal.confirm({
            title: `确定要删除选择的讲师吗？`,
            zIndex: 1003,
            onOk: () => {
                this.teachernewService.delete(selected.map(it => it.id)).subscribe(
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
    }

    recover(status, param?: any) {
        let nStatus = '';
        let onStatus = '';
        if (status == 'CANCEL') {
            onStatus = '恢复';
            nStatus = 'RECOVERY';
        } else {
            onStatus = '取消';
            nStatus = 'CANCEL';
        }
        let selected = param ? [param] : this.selection;
        if (!selected || selected.length == 0) {
            this.modal.warning({
                title: `请选择${onStatus}的讲师`,
                zIndex: 1003,
            });
            return;
        }

        this.modal.confirm({
            title: `确定要${onStatus}选择的讲师吗？`,
            zIndex: 1003,
            onOk: () => {
                this.teachernewService.recover(selected.map(it => it.id), nStatus).subscribe(
                    ok => {
                        tipMessage(`${onStatus}成功`, 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage(`${onStatus}失败`);
                    }
                )
            }
        });
    }


    export() {
        let selected = this.selection;
        let params = { };
        if (selected) {
            params['ids'] = selected.map(it => it.id);
        } 
        if (this._searchForm.controls['teacherNo'].value) {
            params['teacherNo'] = this._searchForm.controls['teacherNo'].value;
        };
        if (this._searchForm.controls['teacherName'].value) {
            params['teacherName'] = this._searchForm.controls['teacherName'].value;
        };
        if (this._searchForm.controls['userGroupId'].value) {
            params['userGroupId'] = this._searchForm.controls['userGroupId'].value.id;
        };
        if (this._searchForm.controls['lv'].value) {
            params['lv'] = this._searchForm.controls['lv'].value;
        };
        this.teachernewService.exportExl(params).subscribe(
            ok => {
                this.teachernewService.exportdownload(ok.sessionName);
            },
            err => {
                tipMessage(err,'',3000);
            }
        )
    }

        // 所属机构处理
        namePath(str) {
            if (str) {
                return str.replace(/,/g, '/');
            } else {
                return "--";
            }
        }

}
