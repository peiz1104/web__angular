import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { TrainingClassApiService } from '../../../../service/training-class-api.service';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-training-class-course-score-pour',
    templateUrl: './training-class-course-score-pour.component.html',
    styleUrls: ['./training-class-course-score-pour.component.scss']
})
export class TrainingClassCourseScorePourComponent implements OnInit {
    right: any[];
    // 导入步骤数
    stepBeginNum: number = 0;
    // 上传文件的类型
    leadFile: string;
    // 路由ID
    tbcId: any;
    // 文件上穿类型
    fileExe: any = {};
    excelInfo: any = [];
    ifSubmitImport: boolean = true;
    canNextStep: boolean = true;
    importErrInfo: string = "";
    Index: any;
    // 列表信息展示
    // stepNumber: number = 0;
    pourColumns: any = [
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '成绩', data: 'score' },
        { title: '状态', data: 'status', tpl: 'state' },
        { title: '信息', data: 'errInfo' }
    ];

    tabs = [];
    nzTabPosition = 'top';
    selectedIndex = 0;
    loading: boolean;
    trainingName: string;
    importNow: boolean = false;

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
        this.trainingClassApiService.courseTrainScoreImportVerify(this.tbcId, file["fullPath"]).subscribe(
            success => {
                this.excelInfo = success;
                this.excelInfo.forEach(element => {
                    this.tabs.push({
                        name: element["name"],
                        content: element["content"],
                        verifyInfo: element["verifyInfo"],
                    });
                });
                this.canNextStep = false;
                this.doneStepOK();
                this.loading = false;
            },
            err => {
                this.canNextStep = true;
                this.importErrInfo = err
                this.ifSubmitImport = true;
                this.loading = false;
            }
        );
    }
    // 下载模版
    downloadModel() {
        this.trainingClassApiService.canGetExcelModel(this.tbcId).subscribe(
            success => {
                let url;
                if (!window.location.origin) {
                    // tslint:disable-next-line:max-line-length
                    url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                } else {
                    url = window.location.origin;
                }
                window.open(url + "/api/courses/" + this.tbcId + "/coursePerformance/excelModel");
            },
            err => { tipMessage(err, '', 5000) }
        );
        // window.location.href = window.location.origin + "/api/courses/" + this.tbcId + "/coursePerformance/excelModel";
    }
    previousStep() {
        this.stepBeginNum = --this.stepBeginNum;
    }
    nextStep(num: number) {
        if (num == 1) {
            if (!this.leadFile) {
                this.importErrInfo = "请选择导入的文件！";
                return;
            }
        }
        this.stepBeginNum = ++this.stepBeginNum;
    }
    doneStep() {
        this.importNow = true;
        this.doneStepOK();
        if (!this.ifSubmitImport) {
            this.trainingClassApiService.savecourseTrainScoreImport(this.tbcId
                , this.fileExe["fullPath"]).subscribe(
                success => {
                    tipMessage('导入文件成功！', 'success');
                    this.stepBeginNum = ++this.stepBeginNum;
                },
                err => { tipMessage(err, '', 5000) }
                );
        } else {
            tipMessage('导入数据失败，请尝试校验数据后重新导入！', 'warning', 5000);
        }
    }
    doneStepOK() {
        let rightInfo = [];
        let isSave = false;
        for (let i = 0; i < this.excelInfo.length; i++) {
            rightInfo = this.excelInfo[i].content.right;
            if (rightInfo) {
                isSave = true;
                break;
            }
        }
        this.ifSubmitImport = !isSave;
    }
    cancelStep() {
        this.location.back();
    }
}
