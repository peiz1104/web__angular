import { TeacherPartService } from './../../service/teachernew.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacher-fulltime',
    templateUrl: './teacher-fulltime.component.html',
    styleUrls: ['./teacher-fulltime.component.scss']
})
export class TeacherFulltimeComponent implements OnInit {
    @ViewChild('tableHandle') tableHandle;
    data: Pagination<any>;
    loading: boolean;
    selection: any;
    isVisibleTeacher: boolean = false;
    teacherId: any;
    searchBy: {
        teacherNo?: any,
        userName?: any,
        displayName?: any,
        publishStatus?: any,
        rank?: any,
        userGroupId?: any,
        classHourD?: any,
        classHourH?: any,
        courseId?: any,
        yearOne?: any,
        yearTwo?: any,
        teacherInfo?: any,
    } = {};
    columns: Column[] = [
        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-left' },
        { title: '讲师工号', data: 'username', styleClass: 'text-center' },
        { title: '讲师姓名', tpl: 'displayName', styleClass: 'text-left' },
        { title: '讲师级别', tpl: 'rank', styleClass: 'text-center' },
        { title: '所属机构', tpl: 'namePathCol', styleClass: 'text-left' },
        { title: '累计课时量', data: 'classHour', styleClass: 'text-right' },
        { title: '发布状态', tpl: 'isPost', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];

    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;
    _options: any;

    isVisible: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private teacherPartService: TeacherPartService,
        private traingapiServer: AuthService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private modal: NzModalService
    ) {
        this.initSearchForm();
    }

    ngOnInit() {
        this.tableHandle.isComplexSearch=true;
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
            userName: [],
            displayName: [],
            publishStatus: [],
            rank: [],
            userGroupId: [],
            classHourD: [],
            classHourH: [],
            courseId: [],
            courseName: [],
            yearOne: [],
            yearTwo: [],
            teacherInfo: [],
        });
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            teacherType: 'FULLTIME',
            ...this.searchBy
        };

        if (this.searchBy.userGroupId) {
            params['userGroupId'] = this.searchBy.userGroupId.id;
            if (Object.prototype.toString.call(this.searchBy.userGroupId) == "[object Object]") {
                params['userGroupId'] = this.searchBy.userGroupId.id;
            } else {
                if (this.searchBy.userGroupId[0] && this.searchBy.userGroupId[0].id) {
                    params['userGroupId'] = this.searchBy.userGroupId.id;
                } else {
                    params['userGroupId'] = this.searchBy.userGroupId.id;
                }
            }
        };
        this.teacherPartService.pageList(params).subscribe(
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
                this.teacherPartService.delete(selected.map(it => it.id)).subscribe(
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
    ispublish(param) {
        let str = !!param.publishStatus ? '取消发布' : '发布';
        let selected = param ? [param] : this.selection;
        if (!selected || selected.length == 0) {
            this.modal.warning({
                title: `请选择要${str}的讲师`,
                zIndex: 1003,
            });
            return;
        }

        this.modal.confirm({
            title: `确定要${str}选择的讲师吗？`,
            zIndex: 1003,
            onOk: () => {
                let obj = {
                    publishStatus: !param.publishStatus,
                }
                this.teacherPartService.isPublish(selected.map(it => it.id), obj).subscribe(
                    ok => {
                        tipMessage(`${str}成功`, 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage(`${str}失败`);
                    }
                )
            }
        });
    }

    showCourse() {
        this.isVisible = true;
    }
    handleCancel(e) {
        this.isVisible = false;
    }

    onSave(e) {
        this.isVisible = false;
        this._searchForm.get(`courseId`).setValue((e[0] && e[0].id) || null);
        this._searchForm.get(`courseName`).setValue((e[0] && e[0].name) || null);
    }
    // 查看信息详情
    showModalList(id) {
        this.teacherId = id;
        this.isVisibleTeacher = true;
    }
    // 取消
    handleCancelTeacherList(event) {
        this.isVisibleTeacher = false;
    }

    // 所属机构处理
    namePath(str) {
        if (str) {
            return str.replace(/,/g, '/');
        } else {
            return "--";
        }
    }

    export() {
        let ids = [];
        let selected = this.selection;
        if (selected) {
            ids = selected.map(it => it.id);
        }
        let params = { };
           params['ids'] = ids;
           params['teacherType'] = 'FULLTIME';
            if(this.searchBy.teacherNo){
                params['teacherNo'] = this.searchBy.teacherNo;
            }
            if(this.searchBy.userName){
                params['userName'] = this.searchBy.userName;
            }
            if(this.searchBy.displayName){
                params['displayName'] = this.searchBy.displayName;
            }
            if(this.searchBy.publishStatus){
                params['publishStatus'] = this.searchBy.publishStatus;
            }
            if(this.searchBy.classHourD){
                params['classHourD'] = this.searchBy.classHourD;
            }
            if(this.searchBy.classHourH){
                params['classHourH'] = this.searchBy.classHourH;
            }
            if(this.searchBy.rank){
                params['rank'] = this.searchBy.rank;
            }
            if(this.searchBy.courseId){
                params['courseId'] = this.searchBy.courseId;
            }
            if(this.searchBy.yearOne){
                params['yearOne'] = this.searchBy.yearOne;
            }
            if(this.searchBy.yearTwo){
                params['yearTwo'] = this.searchBy.yearTwo;
            }
            if(this.searchBy.teacherInfo){
                params['teacherInfo'] = this.searchBy.teacherInfo;
            }  
  
           if (this.searchBy.userGroupId) {
            if (Object.prototype.toString.call(this.searchBy.userGroupId) == "[object Object]") {
                params['userGroupId'] = this.searchBy.userGroupId.id;
            } else {
                if (this.searchBy.userGroupId[0] && this.searchBy.userGroupId[0].id) {
                    params['userGroupId'] = this.searchBy.userGroupId.id;
                } else {
                    params['userGroupId'] = this.searchBy.userGroupId.id;
                }
            }
        };

        this.teacherPartService.exportExl(params).subscribe(
            ok => {
                this.teacherPartService.exportdownload(ok.sessionName);
            },
            err => {
                tipMessage(err);
            }
        )
    }


}
