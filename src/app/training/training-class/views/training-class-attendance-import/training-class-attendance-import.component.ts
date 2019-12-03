/*
 * @Author: majunfeng
 * @Date: 2017-11-20 17:43:10
 * @Last Modified by: peimingjun
 * @Last Modified time: 2018-07-03 18:43:10
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TrainingClassAttendanceApiService } from '../../../service/training-class-attendance.service.';
import { CuiLayer } from 'console-ui-ng';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-training-class-attendance-import',
    templateUrl: './training-class-attendance-import.component.html',
    styleUrls: ['./training-class-attendance-import.component.scss']
})
export class TrainingClassAttendanceImportComponent implements OnInit {

    id: number;
    excelInfo: any = {};
    normal: any[];
    stepNumber: number = 0; // 导入步骤步数
    leadSelectFile: string;
    leadProgress: number = 50; // 加载进度条
    ifSubmitImport: boolean = false;
    loading: boolean = true;
    leadColumns: any = [
        { title: '用户名', data: 'userName' },
        { title: '姓名', data: 'name' },
        { title: '手机号', data: 'phoneNumber' },
        { title: '所属单位', data: 'belongUnit' },
        { title: '成绩', data: 'score' },
        { title: '状态', data: 'status' },
        { title: '信息', data: 'errInfo' }
    ];
    fileExecle: any = {};
    trainingName: string;
    constructor(
        private dialog: CuiLayer,
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private attendanceService: TrainingClassAttendanceApiService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['tbcId'];
            }
        );
        this.route.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingName = obj.trainingClass.name;
            }
        );
    }

    initImport(file) {
        this.loading = true;
        this.fileExecle = file;
        this.leadSelectFile = file['originFileName'];
        this.attendanceService.attendanceImport(this.id, file["fullPath"]).subscribe(
            success => {
                this.loading = false;
                this.excelInfo = success;
                this.ifSubmitImport = true;
            },
            err => {
                this.loading = false;
                this.dialog.confirm(err);
                this.ifSubmitImport = false;
            }
        );
    }

    downloadExcelModel() {
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(url + "/api/training/attendance/excelModel");
    }
    previousStep() {
        this.stepNumber = --this.stepNumber;
    }
    nextStep(num: number) {
        if (num == 1) {
            if (!this.leadSelectFile) {
                tipMessage('请选择导入的文件！', 'info');
                return;
            }
            if (!this.ifSubmitImport) {
                tipMessage('传入文件出错！');
                return;
            }
        }
        this.stepNumber = ++this.stepNumber;
    }
    doneStep() {
        this.doneStepOK();
        if (this.ifSubmitImport) {
            this.attendanceService.saveImport(this.id, this.fileExecle["fullPath"]).subscribe(
                success => {
                    tipMessage('文件导入成功！', 'success');
                    this.location.back();
                },
                err => { this.dialog.confirm(err) }
            );
        } else {
            tipMessage('导入数据失败，请尝试重新导入');
        }

    }
    doneStepOK() {
        this.normal = this.excelInfo.normal || [];
        if (this.normal.length <= 0) {
            this.ifSubmitImport = false;
        }
    }
    cancelStep() {
        this.location.back();
    }

}
