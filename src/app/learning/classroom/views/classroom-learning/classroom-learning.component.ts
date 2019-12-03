import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from 'app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

import { AuthService } from '../../../../core/auth/auth.service';
import { ClassroomService } from './../../service/classroom.service';

@Component({
    selector: 'spk-classroom-learning',
    templateUrl: './classroom-learning.component.html',
    styleUrls: ['./classroom-learning.component.scss']
})
export class ClassroomLearningComponent implements OnInit {

    _searchForm: FormGroup;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    nowYear = new Date();
    isStaff: boolean = true;
    searchBy: {
        courseName?: any,
        username?: any,
        displayName?: any,
        startDate?: any,
        endDate?: any,
        userGroupId?: any,
        isStaff?: boolean,
    } = {};
    load: boolean = false;
    options = [
        { value: true, label: '是' },
        { value: false, label: '否' },
    ];
    @ViewChild('tableHandle') tableHandle;
    columns: any[] = [
        { title: '工号', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '所属组织', data: 'ugName' },
        { title: '课程名称', data: 'courseName' },
        { title: '课程开始时间', tpl: 'startDate' },
        { title: '课程结束时间', tpl: 'endDate' },
        { title: '课程时长', tpl: 'courseTimeLength' },
        { title: '学习时长', tpl: 'courseLength' },
        { title: '学习进度', tpl: 'progress' },
        { title: '获得学时', tpl: 'period' },
        { title: '考试得分', tpl: 'examScore' },
        { title: '完成状态', tpl: 'courseStatus' },
        //   { title: '成绩', data: 'scroe' },
        //   { title: '缺勤次数', data: 'absenceCount' },
        //   { title: '是否通过', data: 'passStatus' },
        //   { title: '推送AMIS反馈结果', data: 'result' },
    ];
    constructor(
        // private statService: StatisticsService,
        private classroomService: ClassroomService,
        private confirmv: NzModalService,
        private router: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService
    ) { }
    // 初始化表单
    initSearchForm() {
        this._searchForm = this.fb.group({
            courseName: [],
            username: [],
            displayName: [],
            startDate: [],
            endDate: [],
            userGroupId: [null],
            isStaff: true,
        });
    }
    ngOnInit() {
        this.initSearchForm();
        this.tableHandle.isComplexSearch = true
        this.authService.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroupId = [user.managerGroup];
                    this._searchForm.get('userGroupId').setValue([user.managerGroup]);
                    //   this.loadData();
                }
            }
        )
    }
    getCourseLength(times) {
        let timer = null;
        let hour = 0,
            minute = 0,
            second = 0;//时间默认值
        if (times > 0) {
            // hour = Math.floor(times / (60 * 60));
            minute = Math.floor(times / 60)
            // second = Math.floor(times) - (hour * 60 * 60) - (minute * 60);
            // if (hour <= 9) hour = 0 + hour;
            if (minute <= 9) minute = 0 + minute;
            // if (second <= 9) second = 0 + second;
            return `${minute}分钟`
        } else {
            return `0分钟`
        }

    }
    // 加载数据
    loadData(page?: Pagination<any>) {
        console.log(this.searchBy);
        this.searchBy = this._searchForm.value;
        let params = {
            ...this.searchBy,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        this.spinning = true;
        if (this.searchBy.endDate) {
            let m = new Date(this.searchBy.endDate).getFullYear();
            let y = new Date(this.searchBy.endDate).getTime();
            params['endDate'] = y;
        } else {
            delete params['endDate']
        }
        if (this.searchBy.startDate) {
            let m = new Date(this.searchBy.startDate).getFullYear();
            let y = new Date(this.searchBy.startDate).getTime();
            params['startDate'] = y;
        } else {
            delete params['startDate']
        }
        if (this.searchBy.userGroupId) {
            params['ugIds'] = this.searchBy.userGroupId.map(it => it.id)
        }
        delete params['userGroupId'];
        if (!this.searchBy.courseName) delete params['courseName'];
        if (!this.searchBy.displayName) delete params['displayName'];
        if (!this.searchBy.username) delete params['username']
        console.log(params);
        this.classroomService.getCourseStatus(params).subscribe(
            res => {
                this.spinning = false;
                this.data = res;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                tipMessage(err);
            }
        )
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        //   console.log(this.searchBy.courseName)
        if (!!this.searchBy.courseName && this.searchBy.userGroupId.length > 0) {
            if (this.searchBy.courseName.trim() == "") {
                return tipMessage('所属组织和课程名称必填！');
            }
            this.loadData();
        } else {
            tipMessage('所属组织和课程名称必填！');
        }
        // console.log(value);
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    // 导出数据
    exportData() {
        if (!this.data.content.length) return tipMessage(`数据为空`)
        this.searchBy = this._searchForm.value;
        let params = {
            ...this.searchBy,
        };
        if (this.searchBy.endDate) {
            let m = new Date(this.searchBy.endDate).getFullYear();
            let y = new Date(this.searchBy.endDate).getTime();
            params['endDate'] = y;
        } else {
            delete params['endDate'];
        }
        if (this.searchBy.startDate) {
            let m = new Date(this.searchBy.startDate).getFullYear();
            let y = new Date(this.searchBy.startDate).getTime();
            params['startDate'] = y;
        } else {
            delete params['startDate'];
        }
        if (this.searchBy.userGroupId) {
            params['ugIds'] = this.searchBy.userGroupId.map(it => it.id)
        }
        delete params['userGroupId'];
        if (!this.searchBy.courseName) delete params['courseName'];
        if (!this.searchBy.displayName) delete params['displayName'];
        if (!this.searchBy.username) delete params['username']
        console.log(params, 444);
        this.load = true;
        this.classroomService.exportDatas(params).subscribe(
            ok => {
                this.load = false;
                let name = ok.sessionName;
                // tslint:disable-next-line:max-line-length
                let url;
                if (!window.location.origin) {
                    // tslint:disable-next-line:max-line-length
                    url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                } else {
                    url = window.location.origin;
                }
                window.open(`${url}/api/export/file/download?sessionName=${name}&fileName=课程学习情况.xlsx`, '_blank')
            },
            err => {
                this.load = false;
                tipMessage(err);
            }
        )
    }

}
