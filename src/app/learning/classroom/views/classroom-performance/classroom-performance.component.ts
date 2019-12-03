import { error } from 'util';
import { NzMessageService } from 'ng-zorro-antd';
import { ClassroomService } from './../../service/classroom.service';
import { Classroom } from './../../entity/classroom';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../../course/entity/course';

@Component({
    selector: 'spk-classroom-performance',
    templateUrl: './classroom-performance.component.html',
    styleUrls: ['./classroom-performance.component.scss']
})
export class ClassroomPerformanceComponent implements OnInit {
    selection: any[];
    exportShow: boolean = true
    classroom: Classroom;
    course: Course;
    searchBy: { status: string, username: string } = { status: "", username: "" };
    data;
    loading: boolean = true;
    columns: Column[] = [
        { title: '用户名', data: 'user.username' },
        { title: '姓名', data: 'user.displayName' },
        { title: '所属单位', data: 'user.userGroup.namePath' },
        { title: '学习次数', data: 'totalTimes' },
        { title: '学习总时长', tpl: 'totalTime' },
        { title: '获得学时', data: 'acquiredPeriod' },
        { title: '学习进度', tpl: 'progress' },
        { title: '学习状态', tpl: 'status' },
        { title: '更新者', data: 'lastModifiedByUsername' },
        { title: '更新日期', tpl: 'lastModifiedDate' }
    ];

    _learnStatus = [
        { label: '已完成', value: 'C' },
        { label: '已通过', value: 'P' },
        { label: '未完成', value: 'F' },
        { label: '学习中', value: 'I' },
        { label: '未学习', value: 'N' },
    ];

    constructor(
        private route: ActivatedRoute,
        private layer: NzMessageService,
        private classroomApi: ClassroomService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { classroom: Classroom, course: Course }) => {
            this.classroom = data.classroom;
            this.course = data.course;
            this.loadData();
        });
    }

    getSearchParams() {
        let param = {};
        param["status"] = this.searchBy.status;
        param["user.username"] = this.searchBy.username;
        return param;
    }
    loadData(page?) {
        this.loading = true;
        this.classroomApi.performance(this.classroom.id, this.getSearchParams(), page).subscribe(
            data => {
                this.data = data;
                this.loading = false;
                this.exportIsShow();
            },
            err => {
                this.loading = false;
            }
        );
    }

    refresh() {
        this.classroomApi.refresh(this.classroom.id, this.course.id).subscribe(
            ok => {
                this.layer.info("正在努力为你处理完成状态,稍后点击搜索查看结果...", { nzDuration: 4000 });
            },
            err => {
                this.layer.error(err, { nzDuration: 4000 });
            }
        );
    }

    exportIsShow() {
        if (this.data.totalElements && this.data.totalElements > 0) {
            this.exportShow = false;
        } else {
            this.exportShow = true;
        }
    }

    // export() {
    // tslint:disable-next-line:max-line-length
    //   window.location.href = window.location.origin + `/api/classrooms/${this.classroom.id}/performanceExport?status=${this.searchBy.status}&user.username=${this.searchBy.username}`;
    // }

    exportCreate() {
        let selected = this.selection ? this.selection.map(it => it.user.id) : undefined;
        this.exportShow = true;
        let param = this.getSearchParams();
        param['selected'] = selected,
            console.log("adas ", selected);
        this.classroomApi.exportCreate(this.classroom.id, param).subscribe(
            ok => {
                this.exportDownload();
            },
            err => {
                this.layer.error(err);
                this.exportShow = false;
            }
        );
    }

    exportDownload() {
        this.exportShow = false;
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(`${url}/api/classrooms/${this.classroom.id}/performanceDownLoad`, '_blank');
    }

    getProgress(progress?: number) {
        progress = progress || 0;
        progress = progress > 100 ? 100 : progress;
        return progress;
    }

    formatSeconds(value) {
        let hour = Math.floor(value / 3600);
        let minute = Math.floor(value % 3600 / 60);
        let second = value % 3600 % 60;
        let newHour = hour > 10 ? hour : "0" + hour;
        let newMinute = minute > 10 ? minute : "0" + minute;
        let newSecond = second > 10 ? second : "0" + second;
        return newHour + ':' + newMinute + ':' + newSecond;
    }
}
