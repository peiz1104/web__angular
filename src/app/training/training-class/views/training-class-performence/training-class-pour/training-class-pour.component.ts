import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { TrainingClassApiService } from '../../../../service/training-class-api.service';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-training-class-pour',
    templateUrl: './training-class-pour.component.html',
    styleUrls: ['./training-class-pour.component.scss']
})
export class TrainingClassPourComponent implements OnInit {
    right: any[];
    // 导入步骤数
    stepBeginNum: number = 0;
    // 上传文件的类型
    leadFile: string;
    // 路由ID
    tbcId: any;
    // 文件上穿类型
    fileExe: any = {};
    excelInfo: any = {};
    ifSubmitImport: boolean = true;
    canNextStep: boolean = true;
    importErrInfo: string = "";
    Index: any;
    // 列表信息展示
    // stepNumber: number = 0;
    pourColumns: any = [
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '手机号', data: 'phoneNumber' },
        { title: '所属单位', data: 'groupName' },
        { title: '成绩', data: 'score' },
        { title: '状态', data: 'scoreStateExcel' },
        { title: '信息', data: 'errInfo' }
    ];
    loading: boolean;
    importNow: boolean = false;
    trainingName: string;
    constructor(
        private activatedRoute: ActivatedRoute,
        private trainingClassApiService: TrainingClassApiService,
        private dialog: CuiLayer,
        private location: Location
    ) { }

    ngOnInit() {
        // 路由拼接
        this.tbcId = this.activatedRoute.snapshot.params['tbcId'];
        this.activatedRoute.queryParamMap.subscribe((data) => {
            this.Index = data.get('Index')
        })
        this.activatedRoute.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingName = obj.trainingClass.name;
            }
        );
    }
    initImport(file) {
        this.fileExe = file;
        this.leadFile = file['originFileName'];
        this.loading = true;
        this.trainingClassApiService.trainScoresImportVerify(this.tbcId, file["fullPath"]).subscribe(
            success => {
                this.excelInfo = success;
                this.canNextStep = false;
                this.importErrInfo = "";
                this.doneStepOK();
                this.loading = false;
            },
            err => {
                this.canNextStep = true;
                this.importErrInfo = err;
                this.ifSubmitImport = true;
                this.loading = false;
            }
        );
    }
    // 下载模版
    downloadModel() {
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(url + "/api/trainScores/excelModel");
    }
    previousStep() {
        this.stepBeginNum = --this.stepBeginNum;
    }
    nextStep(num: number) {
        if (num == 0) {
            if (!this.leadFile) {
                this.importErrInfo = "请选择导入的文件！";
                return;
            }
        }
        this.stepBeginNum = ++this.stepBeginNum;
    }

    doneStep() {
        this.importNow = true;
        this.ifSubmitImport = true;
        this.trainingClassApiService.saveTrainScoresImport(this.tbcId
            , this.fileExe["fullPath"]).subscribe(
            success => {
                tipMessage('文件导入成功！', 'success');
                this.stepBeginNum = ++this.stepBeginNum;
            },
            err => { this.dialog.confirm(err) }
            );
    }

    doneStepOK() {
        this.right = this.excelInfo.right || [];
        if (this.right.length <= 0) {
            this.ifSubmitImport = true;
        } else {
            this.ifSubmitImport = false;
        }
    }
    cancelStep() {
        this.location.back();
    }
}
