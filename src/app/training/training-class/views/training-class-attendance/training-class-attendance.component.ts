import { Component, OnInit } from '@angular/core';
import { TrainClassAttendance } from '../../../entity/train_class_attendance';
import { Pagination } from 'app/core';
import { Column, CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TrainingClassAttendanceApiService } from '../../../service/training-class-attendance.service.';
import { Data } from '@angular/router/src/config';

@Component({
    selector: 'spk-training-class-attendance',
    templateUrl: './training-class-attendance.component.html',
    styleUrls: ['./training-class-attendance.component.scss']
})
export class TrainingClassAttendanceComponent implements OnInit {

    trainingName: string;
    id: number;
    firstName: string;
    data: Pagination<TrainClassAttendance>;
    loading: boolean = true;
    exportShow: boolean = false;
    columns: Column[] = [
        { title: '用户名', data: 'user.username' },
        { title: '姓名', data: 'user.firstName' },
        { title: '手机号', data: 'user.phoneNumber' },
        { title: '所属单位', data: 'user.userGroup.name' },
        { title: '成绩', data: 'score' },
        { title: '状态', data: 'status' },
        { title: '课堂表现', tpl: 'editAttendance' },
    ]

    constructor(private attendanceService: TrainingClassAttendanceApiService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                console.log("params", params);
                this.id = +params['tbcId'];
            }
        );

        this.route.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingName = obj.trainingClass.name;
            }
        );
        this.loadData();
    }

    loadData(event?: Event) {
        this.loading = true;
        let parim = {};
        parim["id"] = this.id && this.id || 1;
        this.attendanceService.getAllOfPage(parim).subscribe(
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

    exportIsShow() {
        if (!this.data.content || this.data.content.length <= 0) {
            this.exportShow = true;
        }
    }

    downloadExcelFile() {
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(url + "/api/training/attendance/download?id=" + this.id)
    }
    searchData() {
        let parim = {};
        parim["id"] = this.id;
        parim["firstName"] = this.firstName;
        this.attendanceService.searchData(parim).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }
}
