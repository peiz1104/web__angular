import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AnnualSubPlanService } from './../../service/annualsubplan.service';
import { ImportMessage } from './../../entity/importmessage';
import { element } from 'protractor';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-childrenplan-import',
    templateUrl: './childrenplan-import.component.html',
    styleUrls: ['./childrenplan-import.component.scss']
})
export class ChildrenPlanImportComponent implements OnInit {

    annualPlanId: number; // 年度计划id
    taskKey: string;
    progress = 0;
    parsedData;
    message?: ImportMessage[];
    status: string;
    messageShow: boolean;
    url: string = "/api/annualsubplan/validImportFile?exportType=P"
    messageColumns = [
        { title: 'sheet名称', tpl: 'colsheet', },
        { title: '序号', tpl: 'colnumber', },
        { title: '错误信息', tpl: 'colmessage', },
    ];
    radioValue = 'P';
    singleValue = true;
    isBlock: boolean = true;
    isPuTong: boolean = true;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private annualSubPlanService: AnnualSubPlanService
    ) { }

    ngOnInit() {
        this.messageShow = false;
        this.annualPlanId = this.activatedRoute.snapshot.params.id;
        this.message = [];
    }
    radionChange = (e) => {
        if (e == "P") {
            this.isBlock = true;
            this.isPuTong = true;
        } else {
            this.isBlock = false;
            this.isPuTong = false;
        }
    }

    onUploadComplete(fileupload) {
        if (fileupload['isFinish']) {
            this.taskKey = fileupload['taskKey'];
            this.status = 'validating';
            this.getImportProgress();
        } else {
            tipMessage(fileupload['mes']);
        }
    }

    import() {
        this.status = 'importing';
        this.annualSubPlanService.import(this.annualPlanId, this.taskKey).subscribe(
            errorList => {
                this.message = errorList;
                tipMessage('导入完成', 'success');
                this.status = 'after';
                this.messageShow = true;
            }
        )
    }

    getImportProgress() {
        this.annualSubPlanService.importProgress(this.taskKey).subscribe(
            m => {
                this.progress = m ? (m['progress'] || 0) : 0;
                if (!this.progress || this.progress < 100) {
                    setTimeout(() => {
                        this.getImportProgress();
                    }, 1000);
                } else {
                    this.parsedData = m['parsedData'];
                    this.status = 'before';
                    if (!this.parsedData) {
                        this.getImportProgress();
                    }
                }
            }
        );
    }

    download() {
        this.annualSubPlanService.download('trainingplan');
    }

    toList() {
        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    }
}
